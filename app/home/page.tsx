export const dynamic = 'force-dynamic';

import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionList";
import CTA from "@/components/CTA";
import {getAllCompanions, getRecentSessions} from "@/lib/actions/companion.actions";
import {getSubjectColor} from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

const Page = async () => {
    const user = await currentUser()
    
    if (!user) {
        redirect('/')
    }

    // SOLUSI SEDERHANA: Cukup tambahkan userId ke getAllCompanions
    const companions = await getAllCompanions({ 
        limit: 3, 
        userId: user.id  // ← INI KUNCINYA
    });

    const recentSessionsCompanions = await getRecentSessions(10);

    return (
        <main>
            <h1>My Companions</h1>

            <section className="home-section">
                {companions.length > 0 ? (
                    companions.map((companion) => (
                        <CompanionCard
                            key={companion.id}
                            {...companion}
                            color={getSubjectColor(companion.subject)}
                        />
                    ))
                ) : (
                    <div className="empty-state-card">
                        <div className="text-center py-8 px-6">
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                No companions created yet
                            </h3>
                            <p className="text-gray-500 mb-6">
                                Let's build your first AI learning companion to help you study more effectively!
                            </p>
                        </div>
                    </div>
                )}
            </section>

            <section className="home-section">
                <CompanionsList
                    title="Recently completed sessions"
                    companions={recentSessionsCompanions}
                    className="w-2/3 max-lg:w-full"
                />
                <CTA />
            </section>
        </main>
    )
}

export default Page