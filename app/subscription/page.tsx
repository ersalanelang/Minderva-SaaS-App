import {PricingTable} from '@clerk/nextjs'
import {auth} from "@clerk/nextjs/server";
import { redirect } from 'next/navigation';

const Subcription = async ()  => {
  const { userId } = await auth();
  if(!userId) redirect('/sign-in');

  return (
    <div className="main-layout" >
      <PricingTable />
      </div>
  )
}

export default Subcription