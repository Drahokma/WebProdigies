'server side'
import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs'
import React from 'react'

type Props = {
    params: { agencyId: string }

}

const SettingsPage = async (props: Props) => {
    const authUser = await currentUser()
    if (!authUser) return null

    const userDetails = await db.user.findUnique({
        where:{
            email: authUser.emailAddresses[0].emailAddress
        }
    })

    if (!userDetails) return null
    const agencyDetails = await db.agency.findUni

  return (
    <div>SettingsPage</div>
  )
}

export default SettingsPage