'use client'
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useAccount } from 'wagmi'
import Inputs from './Inputs'
import boardabi from '../../lib/utils/json/boardABI.json'

function Board2() {
  const [functionName, setFunctionName] = useState('')
  const { data: session, status } = useSession()
  const { address } = useAccount()
  const boardFunctions = boardabi.filter((x) => x.type == 'function')
  let boardInputs = boardabi.filter((values) => values.name == functionName)[0];

  const handleFunctionChange = (event: any) => {
    const { value } = event.target
    setFunctionName(value)
  }

  return (
    <div style={{textAlign: 'center'}}>
      {session ?
        <div>
          <h1>Welcome Board Member</h1>
          <h2>{(session?.user.name == '0xB535c6e924b591013c6027Dc66aAEc5B634ce567') ? "Manager" : "You shouldn't be here"}</h2>
          <h4>Select a function to call a vote on</h4>
          <select name="" id="" onChange={(event) => handleFunctionChange(event)}>
            <option value=""></option>
            {boardFunctions.map((x: any, index: number) => {
              return (
                <option key={index} value={x.name} >{x.name}</option>
              )
            })
            }
          </select>
          <Inputs inputs={boardInputs} />
        </div>
        :
        <div>
          Loading...
        </div>
      }
    </div>
  )
}

export default Board2