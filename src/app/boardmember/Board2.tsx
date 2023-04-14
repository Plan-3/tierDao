'use client'
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useAccount } from 'wagmi'
import {
  prepareWriteContract,
  writeContract,
} from '@wagmi/core'
import Inputs from './Inputs'
import boardabi from '../../lib/utils/json/boardABI.json'

function Board2() {
  const [functionName, setFunctionName] = useState('')
  const { data: session, status } = useSession()
  const { address } = useAccount()
  const boardFunctions = boardabi.filter((x) => x.type == 'function')
  let boardInputs = boardabi.filter((values) => values.name == functionName)[0];

  const addShares = async () => {
    const addSharesConfig = await prepareWriteContract({
      address: '0x9f42A2c5589b56e42b2A9F1C5527efa700163EC0',
      abi: boardabi,
      functionName: 'addShares',
      args: ["class", 1000],
    })

    const addSharesData = await writeContract(addSharesConfig)
    return addSharesData
  }

  const handleFunctionChange = (event: any) => {
    const { value } = event.target
    setFunctionName(value)
  }

  return (
    <div>
      {session ?
        <div>
          <h1>Welcome Board Member</h1>
          <h2>{(session?.user.name == '0xB535c6e924b591013c6027Dc66aAEc5B634ce567') ? "Manager" : "You shouldn't be here"}</h2>
          <select name="" id="" onChange={(event) => handleFunctionChange(event)}>
            {boardFunctions.map((x: any, index: number) => {
              return (
                <option key={index} value={x.name} >{x.name}</option>
              )
            })
            }
          </select>
          <Inputs props={boardInputs} />
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