import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs'
import React from 'react'
import DataTable from './data-table'
import { Plus } from 'lucide-react'

type Props = {
    params: {
        agencyId: string
    }
}

const TeamPage = async ({params}: Props) => {
    const authUser = await currentUser()
    const teamMembers = await db.user.findMany({
      where: {
        Agency: {
          id: params.agencyId,
        },
      },
      include: {
        Agency: { include: { SubAccount: true } },
        Permissions: { include: { SubAccount: true } },
      },
    })

    if (!authUser) return

    const agencyDetails = await db.agency.findUnique({
        where: {
            id: params.agencyId
        },
        include: {
            SubAccount: true,
        }
    })

    if (!agencyDetails) return
    
    return (
        <DataTable 
            actionButtonText={
                <>
                    <Plus size={15} />
                    Add
                </>
            }
            modalChildren={<></>}
            filterValue='name'
            columns={'todo'}
            data={teamMembers}
        />
)}

export default TeamPage