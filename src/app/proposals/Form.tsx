/* 
if using client on a server component
add use client
try adding server component to the page
wrap it in a client component
refresh page and see if it works
*/

'use client';
import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import { MUTATION_ADDPROPOSAL } from '@/lib/utils/graphql/Queries';




interface proposal {
  pname: any,
  quorum: any,
  tier: any,
  options: Array<string>
}




function Form() {
  const [propose, setPropose] = useState<proposal | undefined>(undefined)
  const [addPropose, {error}] = useMutation(MUTATION_ADDPROPOSAL)
  
  
  let DaoName: string;
  let Quorum: number;
  let Options: Array<string>;

  
  const handleName = (event: any) => {
    const { value } = event.target
    DaoName = value
  }
  
  const handleQuorum = (event: any) => {
    const { value } = event.target
    Quorum = Number(value)
  }

  const handleOptions = (event: any) => {
    const { value } = event.target
    console.log(value.split(','));
    Options = value.split(',')
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    const proposed: proposal = {
      pname: DaoName,
      quorum: Quorum,
      tier: 1,
      options: Options
    }
    console.log(proposed.options)
    console.log(Options)
    addPropose({variables: {name: proposed.pname, quorum: proposed.quorum, tier: proposed.tier, options: Options}})
  }


  return (
    <div style={{display: 'flex', flexDirection: 'column', maxWidth: '25%', marginLeft: '1rem'}}>
        <input style={{paddingTop: '.25rem', paddingBottom: '.25rem', margin: '.4rem'}} type="text" placeholder='proposal name' name='pname' onChange={(event) => handleName(event)} />
        <input style={{paddingTop: '.25rem', paddingBottom: '.25rem', margin: '.4rem'}} type="number" placeholder='quorum percent 50' name='quorum' onChange={(event) => handleQuorum(event)} />
        <input style={{paddingTop: '.25rem', paddingBottom: '.25rem', margin: '.4rem'}} type="text" placeholder='Options seperate options with a comma' name='option1' onChange={(event) => handleOptions(event)}/>
        <button style={{paddingTop: '.25rem', paddingBottom: '.25rem', margin: '.4rem'}} onClick={(event) => handleSubmit(event)}>Submit</button>
    </div>
  )
}

export default Form