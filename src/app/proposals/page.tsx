"use server"
import React from 'react'
import Link from 'next/link'
import Form from './Form'
import Nav from './Nav'
import { dbConnect } from '@/lib/utils/mongo/Database'
import Proposal from '@/lib/utils/mongo/models/Dao'
import Voting from './Voting'
import Cprops from './Cprops'




export const metadata = {
  title: "Proposals"
}
interface IntinsicAttributes {
  props: any
}
/*
Can modify head data in each page
alternatively can use 
export async function generateMetadata({params, searchParams}){
  return { title: 'Next.js
}}
*/
export const revalidate = 1

async function page() {
  await dbConnect()
  const props = await Proposal.find({cache: 'no-store'})
  return (
    <div>
      <Nav />
      <h1><Link href='/'>Home</Link></h1>
      <Form/>
      <Voting />
      <Cprops props={props} />
    </div>
  )
}

export default page