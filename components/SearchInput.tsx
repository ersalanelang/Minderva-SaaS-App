'use client'

import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import { Input } from './ui/input';
import {formUrlQuery, removeKeysFromUrlQuery} from "@jsmastery/utils";

const SearchInput = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('topic') || '';

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => { 
      if (searchQuery){
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "topic",
          value: searchQuery,
        });
        router.push(newUrl, {scroll:false});
      } else {
        if(pathname === '/companions') {
            const newUrl = removeKeysFromUrlQuery({
                params: searchParams.toString(),
                keysToRemove: ["topic"],
            });
            router.push(newUrl, { scroll: false });
        }
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, router, query, searchParams, pathname]);

  return (
    <div className="border border-black rounded-lg items-center flex gap-2 px-3 py-2 h-10 w-full">
      <Image 
        src="/icons/search.svg"
        alt="seacrh"
        width={15}
        height={15}
      />
        <Input
          placeholder="search companions..."
          className="outline-none border-none bg-transparent flex-1 h-7 "
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        >
        </Input>
    </div>
  )
}

export default SearchInput