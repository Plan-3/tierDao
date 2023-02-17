/* 
if using client on a server component
add use client
*/

'use client';
import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import { MUTATION_ADDPROPOSAL } from '@/lib/utils/graphql/Queries';



interface proposal {
  pname: any,
  quorum: any,
  tier: any
}



function Form() {
  const [propose, setPropose] = useState<proposal | undefined>(undefined)
  const [addPropose, {error}] = useMutation(MUTATION_ADDPROPOSAL)

  
  let DaoName: string;
  let Quorum: number;

  
  const handleName = (event: any) => {
    const { value } = event.target
    DaoName = value
  }
  
  const handleQuorum = (event: any) => {
    const { value } = event.target
    Quorum = Number(value)
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    const proposed: proposal = {
      pname: DaoName,
      quorum: Quorum,
      tier: 1
    }
    console.log(typeof proposed.quorum)
    addPropose({variables: {name: proposed.pname, quorum: proposed.quorum, tier: proposed.tier}})
  }


  return (
    <div>
      <form action="">
        <input type="text" placeholder='proposal name' name='pname' onChange={(event) => handleName(event)} />
        <input type="number" placeholder='quorum percent 50' name='quorum' onChange={(event) => handleQuorum(event)} />
        <button onClick={(event) => handleSubmit(event)}>Submit</button>
      </form>
    </div>
  )
}

export default Form