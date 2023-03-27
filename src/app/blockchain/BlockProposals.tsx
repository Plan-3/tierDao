'use client'
import { read } from 'fs'
import React, { useState } from 'react'
import {
  useContractWrite,
  useContractRead,
  usePrepareContractWrite
} from 'wagmi'
import { watchContractEvent, signMessage, signTypedData } from '@wagmi/core'
import { BigNumber, Bytes, ethers } from 'ethers'
import Web3 from 'web3'
import token from '../../lib/utils/json/token20.json'
import propContract from '../../lib/utils/json/proposalContract.json'
import governor from '../../lib/utils/json/governorabi.json'
import tokenFactory from '../../lib/utils/json/pancakeswapfactory.json'

const encode = (functionToCall: string, args: any) => {
  return ethers.utils.formatBytes32String(functionToCall + args)
}


interface objProposal {
  name: string,
  tier: number,
  votes: number,
  initiated: string
}
function BlockProposals() {
  const [proposal, setProposal] = useState('')
  const [newProposal, setNewProposal] = useState('')
  const [success, setSuccess] = useState(false)
  const [read, setRead] = useState(false)
  const [objProposal, setObjProposal] = useState<objProposal>()


  const { config: configVoteYes } = usePrepareContractWrite({
    address: '0x90593829c40a6Cb650178fCFAb490F97574743E2',
    abi: propContract,
    functionName: 'voteYes',
    args: [proposal]
  })


  const { config: configCreateProposal } = usePrepareContractWrite({
    address: '0x90593829c40a6Cb650178fCFAb490F97574743E2',
    abi: propContract,
    functionName: 'newProposal',
    args: [newProposal],
    onSuccess(data: any) {
      setSuccess(false)
    }
  })


  // const {config: configUpdateVotingPeriod} = usePrepareContractWrite({
  //   address: '0xca937637769D0e893492Aa9eBB8CCDEc620E38C1',
  //   abi: governor,
  //   functionName: 'setVotingPeriod',
  //   args: [3600]
  // })
  // const {config: configPropose} = usePrepareContractWrite({
  //   address: '0xca937637769D0e893492Aa9eBB8CCDEc620E38C1',
  //   abi: governor,
  //   functionName: 'propose',
  //   args: [
  //     //target address
  //     ['0xca937637769D0e893492Aa9eBB8CCDEc620E38C1'], 
  //     //value
  //     [0], 
  //     //calldata bytes of function name and args
  //     [encode('propose', 3600)],
  //     // description of proposal
  //     "Increase voting period to 1 hour"
  //   ]
  // })




  const { data } = useContractRead({
    address: '0x90593829c40a6Cb650178fCFAb490F97574743E2',
    abi: propContract,
    functionName: 'getProposals',
    args: [proposal],
    enabled: read,
    onSuccess(data: any) {
      let initializedDate = new Date(BigNumber.from(data.initiated._hex).toNumber() * 1000).toDateString()
      setObjProposal({ name: BigNumber.from(data[0]).toHexString(), votes: BigNumber.from(data.votes._hex).toNumber(), tier: BigNumber.from(data.tier._hex).toNumber(), initiated: initializedDate })
      setRead(!read)
    }
  })


  const unwatch = watchContractEvent({
    address: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
    abi: tokenFactory,
    eventName: 'PairCreated',
    chainId: 56,
    once: true,
  },
    (token0, token1, pair, name) => {
      console.log(token0, token1, pair, name)
    })


  const {
    data: dataVoteYes,
    isError: voteYesError,
    isLoading: voteYesLoading,
    write: voteYesWrite
  } = useContractWrite(configVoteYes)


  const {
    isSuccess: createProposalSuccess,
    isLoading: createProposalLoading,
    write: createProposalWrite
  } = useContractWrite(configCreateProposal)
  /*
  const {
   data: dataVotingPeriod,
   isSuccess: updateVotingPeriodSuccess,
   isLoading: updateVotingPeriodLoading,
   write: updateVotingPeriodWrite
  } = useContractWrite(configUpdateVotingPeriod)
  const {
   isSuccess: dataProposeSuccess,
   isLoading: dataProposeLoading,
   data: dataPropose,
   write: dataProposeWrite
  } = useContractWrite(configPropose)
  */

  const handleGetProposal = (event: any) => {
    const { value } = event.target
    setProposal(value)
  }


  const handleChange = (event: any) => {
    const { value } = event.target
    setNewProposal(value)
  }


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
      <input style={{ padding: '.4rem', margin: '.4rem' }} type="text" placeholder='Proposal name' onChange={(event) => handleGetProposal(event)} />
      <button style={{ padding: '.4rem', margin: '.4rem' }} onClick={() => {
        setRead(!read)
        console.log(proposal)
      }
      }>See console</button>
      <div>
        {objProposal ?
          <div style={{ float: 'right' }}>
            <h4>Proposal Name: {proposal.split("\"")}</h4>
            <h4>Proposal Tier: {objProposal.tier}</h4>
            <h4>Proposal Votes: {objProposal.votes}</h4>
            <h4>Initiated At: {objProposal.initiated}</h4>
            <button style={{ padding: '1rem' }} onClick={() => voteYesWrite?.()}>Vote Yes</button>
          </div>
          :
          null
        }
      </div>
      {success ?
        <h4>Loading...</h4>
        :
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <input style={{ padding: '.4rem', margin: '.4rem' }} type="text" placeholder='Proposal Name' onChange={(event) => handleChange(event)} />
          <button style={{ padding: '.4rem', margin: '.4rem' }} onClick={() => {
            createProposalWrite?.()
            setSuccess(true)
          }
          }>Submit Proposal</button>
        </div>
      }

      {/* <button style={{padding: '.4rem', width: '25%', marginTop: '5px'}} onClick={() => dataProposeWrite?.()}>Update voting period</button> */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button style={{ padding: '.4rem', marginTop: '5px' }} onClick={() => unwatch()}>Get events</button>
      </div>

    </div>
  )
}

export default BlockProposals