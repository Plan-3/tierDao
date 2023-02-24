'use client';
import React from 'react'
import { useMutation } from '@apollo/client';
import { MUTATION_DELETEPROPOSAL } from '@/lib/utils/graphql/Queries';

function Cprops({props}: any) {
  const [deletePropose, {error}] = useMutation(MUTATION_DELETEPROPOSAL)
  return (
    <div>
      {props.map((prop: any, index: number) => {
        let date = new Date(prop.date).toDateString()
        let dateToUnix = new Date(prop.date).valueOf()
        let proposalEnd = new Date(dateToUnix + (1000 * 60 * 60 * 24))
        let hour = proposalEnd.toTimeString().split(' ')[0]
        let over = dateToUnix >= proposalEnd.valueOf()
        /*can block out the proposal if it has ended
        if(over){
          return
        }
        */
        //if hasnt ended, display the proposal
        //can display proposal ending in a ternary operator or not display it all

        return (
          <div key={index}>
            <h1 >{prop.name} ID:{prop._id.toString()}</h1>
            <p>Quorum Percent: {prop.quorum}</p>
            <p>Tier: {prop.tier}</p>
            <p>Proposal created at: {date}</p>
            {over ?
              <p>Proposal has ended</p>
              :
              <p>Proposal will end at: {proposalEnd.toDateString()} {(Number(hour.split(':')[0]) >= 12) ? hour + ' pm' : hour + ' am'}</p>
            }
            {prop.options.map((option: any, index: number) => {
              return (
                <div key={index}>
                  <button>{option}</button>
                </div>
              )
            })}
            <button onClick={() => deletePropose({variables: {id: prop._id.toString()}})}>Delete</button>
          </div>
        )
      })}

    </div>
  )}

  export default Cprops