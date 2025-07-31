'use server';

import {auth} from "@clerk/nextjs/server";
import {createSupabaseClient} from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export const createCompanion = async (formData: CreateCompanion) => {
    const { userId: author } = await auth();
    const supabase = createSupabaseClient();

    const { data, error } = await supabase
        .from('companions')
        .insert({...formData, author })
        .select();

    if(error || !data) throw new Error(error?.message || 'Failed to create a companion');

    return data[0];
}

export const getAllCompanions = async ({ limit = 10, page = 1, subject, topic, userId }: GetAllCompanions) => {
    const { userId: currentUserId } = await auth();
    const supabase = createSupabaseClient();

    // Filter berdasarkan user_id jika userId disediakan
    let query = supabase.from('companions').select();

    // KUNCI: Filter berdasarkan author jika userId disediakan
    if (userId) {
        query = query.eq('author', userId);
    }

    if(subject && topic) {
        query = query.ilike('subject', `%${subject}%`)
            .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    } else if(subject) {
        query = query.ilike('subject', `%${subject}%`)
    } else if(topic) {
        query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    }

    query = query.range((page - 1) * limit, page * limit - 1);

    const { data: companions, error } = await query;

    if(error) throw new Error(error.message);
    if (!companions || companions.length === 0) {
        return [];
    }

    // Jika tidak ada user yang login, return companions tanpa bookmark status
    if (!currentUserId) {
        return companions.map(companion => ({
            ...companion,
            bookmarked: false
        }));
    }

    // Query bookmarks untuk user saat ini
    const companionIds = companions.map(c => c.id);
    const { data: bookmarks } = await supabase
        .from('bookmarks')
        .select('companion_id')
        .eq('user_id', currentUserId)
        .in('companion_id', companionIds);

    // Set bookmark IDs untuk lookup cepat
    const bookmarkedIds = new Set(bookmarks?.map(b => b.companion_id) || []);

    // Transform data untuk menambahkan field bookmarked
    const companionsWithBookmarks = companions.map(companion => ({
        ...companion,
        bookmarked: bookmarkedIds.has(companion.id)
    }));

    return companionsWithBookmarks;
};

export const getCompanion = async (id: string) => {
    const supabase = createSupabaseClient();

    const { data, error } = await supabase
        .from('companions')
        .select()
        .eq('id', id);

    if(error) return console.log(error);

    return data[0];
}

// Add session after finish to add home per user
export const addToSessionHistory = async (companionId: string) => {
    const { userId } = await auth();
    const supabase = createSupabaseClient();
    
    // Check if session already exists
    const { data: existingSession } = await supabase
        .from('session_history')
        .select('id')
        .eq('companion_id', companionId)
        .eq('user_id', userId)
        .single();

    if (existingSession) {
        // Update existing session timestamp
        const { data, error } = await supabase
            .from('session_history')
            .update({ created_at: new Date().toISOString() })
            .eq('id', existingSession.id)
            .select();
            
        if(error) throw new Error(error.message);
        return data;
    } else {
        // Insert new session
        const { data, error } = await supabase
            .from('session_history')
            .insert({
                companion_id: companionId,
                user_id: userId,
            })
            .select();

        if(error) throw new Error(error.message);
        return data;
    }
}

export const getRecentSessions = async (limit = 10) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from('session_history')
        .select(`companions:companion_id (*)`)
        .order('created_at', { ascending: false })
        .limit(limit)

    if(error) throw new Error(error.message);

    return data.map(({ companions }) => companions);
}

export const getUserSessions = async (userId: string, limit = 10) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from('session_history')
        .select(`companions:companion_id (*)`)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit)

    if(error) throw new Error(error.message);

    return data.map(({ companions }) => companions);
}
// =========================================================

export const getUserCompanions = async (userId: string) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from('companions')
        .select()
        .eq('author', userId)

    if(error) throw new Error(error.message);

    return data;
}

export const newCompanionPermissions = async () => {
    const { userId, has } = await auth();
    const supabase = createSupabaseClient();

    let limit = 0;

    if(has({ plan: 'pro' })) {
        return true;
    } else if(has({ feature: "3_companion_limit" })) {
        limit = 3;
    } else if(has({ feature: "10_companion_limit" })) {
        limit = 10;
    }

    const { data, error } = await supabase
        .from('companions')
        .select('id', { count: 'exact' })
        .eq('author', userId)

    if(error) throw new Error(error.message);

    const companionCount = data?.length;

    if(companionCount >= limit) {
        return false
    } else {
        return true;
    }
}

// Bookmarks
export const addBookmark = async (companionId: string, path: string) => {
  const { userId } = await auth();
  if (!userId) return;
  
  const supabase = createSupabaseClient();
  
  // Cek apakah bookmark sudah ada untuk mencegah duplikasi
  const { data: existingBookmark } = await supabase
    .from("bookmarks")
    .select("id")
    .eq("companion_id", companionId)
    .eq("user_id", userId)
    .single();

  if (existingBookmark) {
    // Bookmark sudah ada, tidak perlu menambah lagi
    revalidatePath(path);
    return existingBookmark;
  }

  const { data, error } = await supabase
    .from("bookmarks")
    .insert({
      companion_id: companionId,
      user_id: userId,
    })
    .select();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(path);
  return data[0];
};

export const removeBookmark = async (companionId: string, path: string) => {
  const { userId } = await auth();
  if (!userId) return;
  
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("companion_id", companionId)
    .eq("user_id", userId);
    
  if (error) {
    throw new Error(error.message);
  }
  
  revalidatePath(path);
  return data;
};

export const getBookmarkedCompanions = async (userId: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("bookmarks")
    .select(`companions:companion_id (*)`)
    .eq("user_id", userId);
    
  if (error) {
    throw new Error(error.message);
  }
  
  // Transform data dan tambahkan bookmarked: true (karena semua sudah pasti bookmarked)
  const companions = data?.map(({ companions }) => ({
    ...companions,
    bookmarked: true
  })) || [];

  return companions;
};
