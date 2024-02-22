 import { getAuthUserDetails } from '@/lib/queries';
import React from 'react';
import MenuOptions from './menu-options';
 
 interface SidebarProps {
    id: string,
    type: "agency" | "subaccount"
 }
 
 const Sidebar: React.FC<SidebarProps > = async ({id, type }) => {
    const user = await getAuthUserDetails()
    if (!user) return null
    if (!user.Agency) return

    const details = type==='agency'? user.Agency : user.Agency.SubAccount.find(subaccount=> subaccount.id === id)

    const isWhiteLabeledAgency = user.Agency.whiteLabel

    if (!details) return 

    let sideBarLogo = user.Agency.agencyLogo || '/assets/plura-logo.svg'

    if (!isWhiteLabeledAgency){
         if (type === 'subaccount'){
            sideBarLogo = user?.Agency.SubAccount.find((subaccount)=>subaccount.id === id)?.subAccountLogo  || sideBarLogo;
         }
    }

    const sideBarOpt = type === 'agency'? user.Agency.SidebarOption || [] 
        : user.Agency.SubAccount.find((subaccount)=> subaccount.id === id)?.SidebarOption || []  

    const subaccounts = user.Agency.SubAccount.filter((subaccount)=>
        user.Permissions.find(permission => 
            permission.subAccountId === subaccount.id  && permission.access   
        )    
    )
 

    return (
        <>
          <MenuOptions
            defaultOpen={true}
            details={details}
            id={id}
            sidebarLogo={sideBarLogo}
            sidebarOpt={sideBarOpt}
            subAccounts={subaccounts}
            user={user}
          />
          <MenuOptions
            details={details}
            id={id}
            sidebarLogo={sideBarLogo}
            sidebarOpt={sideBarOpt}
            subAccounts={subaccounts}
            user={user}
          />
        </>
      )
 };
 
 export default Sidebar;