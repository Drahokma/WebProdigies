import { SignIn } from '@clerk/nextjs'
import React from 'react'

const Page = () => {
  console.log('sign-in page')
  return <SignIn />
}

export default Page