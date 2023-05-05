'use client'
import React, {useState, useEffect} from 'react'
import { useSession } from 'next-auth/react'
import { useAccount } from 'wagmi'
import Link from 'next/link'
import President  from './President'
import Board2 from './Board2'
import Voting from './Voting'
import ercvotes from '../../lib/utils/json/erc20votes.json'
import {
  prepareWriteContract,
  writeContract,
} from '@wagmi/core'
import Web3 from 'web3'
import {AbiItem} from 'web3-utils'

const web3 = new Web3("https://polygon-mumbai.g.alchemy.com/v2/ITvmLNjk1vvbZAi2yjIa9KHovUc8Q7_y")
const ercContract = new web3.eth.Contract(ercvotes as AbiItem[], '0xbb64FD2Ad01df6fD4Eb0669526Da6f35EBf804FE')

function Member() {
  const [delegated, setDelegated] = useState(false)
  const { data: session, status } = useSession()
  const { address } = useAccount()
  
  const delegate = async () => {
    const delegateConfig = await prepareWriteContract({
      address: '0xbb64FD2Ad01df6fD4Eb0669526Da6f35EBf804FE',
      abi: ercvotes,
      functionName: 'delegate',
      args: [address]
    })

    const delegateData = await writeContract(delegateConfig)
    return delegateData
  }

    const getDelegates = async () => {
      let dg: any = []
      const delegates = await ercContract.getPastEvents('DelegateChanged', {fromBlock: 0, toBlock: 'latest'})
      delegates.forEach((dx: any) => {
        dg.push(dx.returnValues.toDelegate)
      })
      for (let index = 0; index < dg.length; index++) {
        const element = dg[index];
        if(element == session?.user.name){
          setDelegated(true)
        }
      }
    }
    getDelegates()
  return (
    <div>
      <h1><Link href={'/'}> Home</Link></h1>
      <h3>Please delegate your tokens if you haven't already</h3>
      {delegated ? <h3>Delegated already </h3>:<button onClick={() => delegate()}>Delegate</button>}
      <div>
        {session?.user.name == '0xb94ae34DE09B1EeF75E18e8Ed17F91C32E9B0A9f' ?
          <div>
            <Link href='/secretary'>Welcome Secretary</Link>
          </div>
          :
          (session?.user.name == '0x7AD00f47AD50194d6d54b2F8605E7d2803795BF4') ?
            <div>
              <President />
            </div>
            :
            (session?.user.name == '0xB535c6e924b591013c6027Dc66aAEc5B634ce567') ?
              <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <Board2 />
                <Voting />
              </div>

              : "You are not authorized to view this page"
        }
      </div>
    </div>
  )
}

export default Member