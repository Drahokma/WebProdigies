import React from 'react' 
import { getAuthUserDetails, verifyAndAcceptInvitation } from '@/lib/queries'
import { redirect } from 'next/navigation'
import { Plan } from '@prisma/client'
import { currentUser } from '@clerk/nextjs'
import AgencyDetails from '@/components/forms/agency-details'

interface SearchParams  {
    plan: Plan,
    state: string,
    code: string
}

const Page = async (
    searchParams: SearchParams
) => {
    const agencyId = await verifyAndAcceptInvitation()
    const user = await  getAuthUserDetails() 
    console.log('agency id in agency page', agencyId, user?.role)

    if (agencyId){
        if (user?.role === "SUBACCOUNT_GUEST" || user?.role === "SUBACCOUNT_USER") {
            return redirect('/subaccount')
        }
        else if ( user?.role === "AGENCY_ADMIN" || user?.role === "AGENCY_OWNER") {
            if (searchParams.plan) {
                return redirect(`/agency/${agencyId}/billing?plan=${searchParams.plan}`)
            }

            if (searchParams.state) {
                const statePath = searchParams.state.split('__')[0]
                const stateAgencyId = searchParams.state.split('___')[1]

                if (!stateAgencyId) return <div> Not Authorized </div>
                return redirect(`/agency/${stateAgencyId}/${statePath}?code=${searchParams.code}`)
            } else {
                console.log('it goes through here', agencyId)
                return redirect( `/agency/${agencyId}`)
            }
        } else {
            return  <div>Not authorised</div>
        }
    }
    const authUser = await currentUser()
    return (
       <div className='flex justify-center items-center mt-4'>
        <div className='max-w-[850px] border-[1px] p-4 rounded-xl'>
            <h1 className='text-4xl'> Create an Agency </h1>
            <AgencyDetails
                data={{companyEmail: authUser?.emailAddresses[0].emailAddress}}
            />
        </div>
       </div>
    ) 
}

export default Page
