'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import Web3 from 'web3'
import {AbiItem} from 'web3-utils'
import ercvotes from '../../lib/utils/json/erc20votes.json'

const web3 = new Web3("https://polygon-mumbai.g.alchemy.com/v2/ITvmLNjk1vvbZAi2yjIa9KHovUc8Q7_y")
const ercContract = new web3.eth.Contract(ercvotes as AbiItem[], '0xbb64FD2Ad01df6fD4Eb0669526Da6f35EBf804FE')
let delegate: any = []

function Delegates() {
  const { data: session, status } = useSession()

  const getDelegates = async () => {
    const delegates = await ercContract.getPastEvents('DelegateChanged', {fromBlock: 0, toBlock: 'latest'})
    delegates.forEach((dx: any) => {
      delegate.push(dx.returnValues)
    })
  }
  getDelegates()
  
  
  return (
    <div>
      {delegate.map((item: any, index: number) => {
        return (
          <div key={index}>
            {item.delegator == session?.user.name ? <h1>Already delegated</h1>:<h1>Delegate: {item.delegator}</h1>}
          </div>
          )
      })
      }
    </div>
  )
}

export default Delegates