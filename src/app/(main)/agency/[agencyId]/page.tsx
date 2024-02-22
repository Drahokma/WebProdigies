 import React from 'react';
 
 interface Params {
    agencyId: string
 }
 
 const Page = async (params: Params) => {
    return (
        <div className='text-white'>
              jak to jde {params.agencyId}
        </div>
    );
 };
 
 export default Page;