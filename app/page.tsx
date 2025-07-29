import React from 'react'
import CompanionCard from '@/components/CompanionCard'
import CompanionList from '../components/CompanionList'
import Cta from '../components/CTA'
// import { recentSessions } from '../constants'
import { getAllCompanions, getRecentSessions } from '../lib/actions/companion.actions'
import { getSubjectColor } from '../lib/utils'


const Page = async () => {
  const companions = await getAllCompanions({ limit: 3 });
  const recentSessionsCompanions = await getRecentSessions(10);

  return (
    <main>
      <div className="mx-0 max-sm:mx-2">
        <h1 className="pb-8 max-sm:pb-7">Popular Companions</h1>
        <section className="home-section">
          {companions.map((companion) =>(
            <CompanionCard 
              key={companion.id}
              {...companion}
              color={getSubjectColor(companion.subject)}
            />
          ))}
        </section>
        <section className="home-section pt-8  max-sm:pt-4">
          <CompanionList 
            title="Recently compleyed Sessions"
            companions={recentSessionsCompanions} 
            className="w-2/3 max-lg:w-full"
          />
          <Cta />
        </section>
      </div>
    </main>
  )
}

export default Page