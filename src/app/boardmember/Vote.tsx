'use client'
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Web3 from "web3"
import { AbiItem } from 'web3-utils'
import { prepareWriteContract, writeContract } from '@wagmi/core';
import governor from '../../lib/utils/json/governorabi.json'
import address from '../../lib/utils/json/addresses.json'



const web3 = new Web3("https://polygon-mumbai.g.alchemy.com/v2/ITvmLNjk1vvbZAi2yjIa9KHovUc8Q7_y")
const govContract = new web3.eth.Contract(governor as AbiItem[], '0x67f411fd69ff92f7432f8be60f6677e2bcda71df')

const votingType = governor.filter((x: any) => x.name == 'castVote')
/*
look at counting mode function in governor contract
check gov notes
1=for 0=against 2=abstain
*/

type VoteProps = {
  reason: string,
  weight: number
}

function Vote(props: any) {
  const [voted, setVoted] = useState<VoteProps>()
  const { data: session, status } = useSession()
  

  const checkVote = async () => {
    const voted = await govContract.getPastEvents('VoteCast', { fromBlock: props.props.startBlock, toBlock: 'latest' })
      voted.forEach((vx: any) => {
        if(vx.returnValues.voter == session?.user.name) {
          let simpleView: number = vx.returnValues.weight / 10**18
          switch(vx.returnValues.support) {
            case '0':
              setVoted({reason: 'voted against', weight: simpleView})
              break;
            case '1':
              setVoted({reason: 'voted for', weight: simpleView})
              break;
            case '2':
              setVoted({reason: 'abstained', weight: simpleView})
              break;
          }
        }
      })
  }
  const vote = async (endorse: number) => {
    const govConfig = await prepareWriteContract({
      address: '0x67F411FD69fF92F7432F8bE60F6677e2BCDA71dF',
      abi: governor,
      functionName: 'castVote',
      args: [
        props.props.proposalId,
        endorse
      ]
    })
    const govData = await writeContract(govConfig)
    return govData
  }
  checkVote()
  return (
    <div>
      {voted != undefined ? <h1>You have {voted.reason} with {voted.weight} P3V</h1> : 
      <div>
        <button style={{ backgroundColor: 'green' }} onClick={() => vote(1)}>For</button>
        <button style={{ backgroundColor: '#c30000' }} onClick={() => vote(0)}>Against</button>
        <button style={{ backgroundColor: '#777' }} onClick={() => vote(2)}>Abstain</button>
      </div>
}
    </div>
  )
}

export default Vote