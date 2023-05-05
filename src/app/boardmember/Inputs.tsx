'use client'
import React, {useState} from 'react'
import { prepareWriteContract, writeContract } from '@wagmi/core';
import {ethers} from 'ethers'
import boardabi from '../../lib/utils/json/boardABI.json'
import governor from '../../lib/utils/json/governorabi.json'
import address from '../../lib/utils/json/addresses.json'


interface proposal {
  targets: string[],
  values: number[],
  calldatas: string[],
  description: string
}
const encode = (functionToCall: string, args: any) => {
  return ethers.utils.formatBytes32String(functionToCall + args)
}
/* 
issues: if submit is not clicked after each input the calldata array is duplicated
*/
function Inputs(inputs: any) {
  const [description, setDescription] = useState('')
  const [addDescription, setAddDescription] = useState(false)
  // extract address array from json file index key is in json file for reference
  const something: any = address[0][80001]
  
  
  
  let newInput: proposal = {
    targets: [],
    values: [],
    calldatas: [],
    description: ''
  }

  const handleInputChange = (event: any) => {
    const { value } = event.target
    let eachInput = value
    newInput.calldatas.push(eachInput)
  }

  const gov = async () => {
    const calldatas = encode(inputs.inputs.name, newInput.calldatas)
    
    const govConfig = await prepareWriteContract({
    address: '0x67F411FD69fF92F7432F8bE60F6677e2BCDA71dF',
    abi: governor,
    functionName: 'propose',
    args: [
      // targets[] target contract address
      [something[5]],
      // values[] value to send to target contract usually not needed value == matic, eth etc
      [0],
      // calldatas bytes[] function name and arguments combined into bytes 
      [calldatas],
      // description string description of proposal optional
      description || ""
    ],
  })

  const govData = await writeContract(govConfig)
}


  
  return (
    <div>
      {inputs.inputs == undefined ?
        <div>
          Loading...
        </div>
        :
        <div>
          {inputs.inputs.inputs.length > 0 ?
            <div>
              {
                inputs.inputs.inputs.map((x: any, index: number) => {
                  return (
                    <div key={index}>
                      <p>{x.name}</p>
                      <input type="text" placeholder={x.type} onBlur={(event) => handleInputChange(event) }/>
                    </div>
                  )
                })
              }
            </div>
            : 
            "No inputs"
          }
            <div>
              <h4>Add a description?</h4>
              <label htmlFor="descBool">Yes</label>
              <input type="checkbox" name="descBool" id="" onChange={() => setAddDescription(!addDescription)}/>
            </div>
          <div>{addDescription ?
            <div>
              <input type="text" name="" id="" placeholder='description' onChange={(event) => setDescription(event.target.value)}/>
            </div>
            :
            ''
            }
            <button type='submit' onClick={()=> gov()}> Start Vote</button>
          </div>
        </div>
      }
    </div >
  )
}

export default Inputs