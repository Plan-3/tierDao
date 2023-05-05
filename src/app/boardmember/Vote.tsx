
'use client'
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Web3 from "web3"
import { ethers } from 'ethers'
import { AbiItem } from 'web3-utils'
import { prepareWriteContract, writeContract, readContract, waitForTransaction } from '@wagmi/core';
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
  const [propState, setPropState] = useState('')
  const [voted, setVoted] = useState<VoteProps>()
  const { data: session, status } = useSession()
  
  useEffect(() => {
  const checkVote = async () => {
    const voted = await govContract.getPastEvents('VoteCast', { fromBlock: props.props.startBlock, toBlock: props.props.endBlock })
    voted.forEach((vx: any) => {
      if (vx.returnValues.voter == session?.user.name) {
        let simpleView: number = vx.returnValues.weight / 10 ** 18
        switch (vx.returnValues.support) {
          case '0':
            setVoted({ reason: 'voted against', weight: simpleView })
            break;
          case '1':
            setVoted({ reason: 'voted for', weight: simpleView })
            break;
          case '2':
            setVoted({ reason: 'abstained', weight: simpleView })
            break;
        }
      }
    })
  }
  checkVote()
}, [])
  const execute = async (deciding: string) => {
    console.log(deciding, props.props.targets, props.props.calldatas, ethers.utils.keccak256(ethers.utils.toUtf8Bytes(props.props.description)))
    const executableConfig = await prepareWriteContract({
      address: '0x67F411FD69fF92F7432F8bE60F6677e2BCDA71dF',
      abi: governor,
      functionName: deciding,
      args: [
        // targets[] target contract address
        props.props.targets,
        // values[] value to send to target contract usually not needed value == matic, eth etc
        [0],
        // calldatas bytes[] function name and arguments combined into bytes 
        props.props.calldatas,
        // execute and queue take a hash of the proposal description
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes(props.props.description)),
      ],
    })  
    
    const executableData = await writeContract(executableConfig)
    return executableData
  }
  useEffect(() => {
  const checkState = async () => {
    const state = await govContract.methods.state(props.props.proposalId).call()
    switch (state) {
      case '0':
        setPropState('Pending')
        break;
      case '1':
        setPropState('Active')
        break;
      case '2':
        setPropState('Canceled')
        break;
      case '3':
        setPropState('Defeated')
        break;
      case '4':
        setPropState('Succeeded')
        break;
      case '5':
        setPropState('Queued')
        break;
      case '6':
        setPropState('Expired')
        break;
      case '7':
        setPropState('Executed')
        break;
    }
  }
  checkState()
}, [])

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
  return (
    <div>
      {voted != undefined ? 
        <h4>You have {voted.reason} with {voted.weight} P3V</h4> 
        :
        ''
      }
      {propState == 'Succeeded' ?
        <button onClick={() => execute('queue')}>Queue</button>
        :
        propState == 'Queued' ?
        <button onClick={() => execute('execute')}>Execute</button>
        :
        propState == 'Active' ?
        <div>
          <button style={{ backgroundColor: 'green' }} onClick={() => vote(1)}>For</button>
          <button style={{ backgroundColor: '#c30000' }} onClick={() => vote(0)}>Against</button>
          <button style={{ backgroundColor: '#777' }} onClick={() => vote(2)}>Abstain</button>
        </div>
        :
        <h4>{propState}</h4>
    }
      
    </div>
  )
}

export default Vote