import React from 'react'
import Form from './Form'
import Nav from './Nav'
import { dbConnect } from '@/lib/utils/mongo/Database'
import Proposal from '@/lib/utils/mongo/models/Dao'
import Voting from './Voting'




export const metadata = {
  title: "Proposals"
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
  const props = await Proposal.find()
  
  return (
    <div>
      <Nav />
      <h1>This</h1>
      <Form />
      {props.map((prop:any, index:number) => {
        let dateToUnix = new Date(prop.date).valueOf()
        let proposalEnd = new Date(dateToUnix + (1000*60*60*24))
        let hour = proposalEnd.toTimeString().split(' ')[0]
        let over = dateToUnix >= proposalEnd.valueOf()
        /*can block out the proposal if it has ended
        if(over){
          return
        }
        */
        //if hasnt ended, display the proposal
        //can display proposal ending in a ternary operator or not display it all
        return(
          <div key={index}>
            <h1>{prop.name} ID: {prop._id}</h1>
            <p>Quorum Percent: {prop.quorum}</p>
            <p>Tier: {prop.tier}</p>
            <p>Proposal created at: {prop.date.toDateString()}</p>
            {over ?   
              <p>Proposal has ended</p> 
            : 
              <p>Proposal will end at: {proposalEnd.toDateString()} {(Number(hour.split(':')[0])>=12) ? hour+' pm' : hour+' am'}</p>
            }
            {prop.options.map((option:any, index:number) => {
              return(
                <div key={index}>
                  <button>{option}</button>
                </div>
              )
            })}
              <Voting />
          </div>
        )
      })}
    </div>
  )
}

export default page