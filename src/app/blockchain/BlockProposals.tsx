'use client'
import { read } from 'fs'
import React, {useState} from 'react'
import {
  useContractWrite,
  useContractRead,
  usePrepareContractWrite
} from 'wagmi'
import { BigNumber, Bytes } from 'ethers'
import propContract from '../../lib/utils/json/proposalContract.json'


interface objProposal{
  name: string,
  tier: number,
  votes: number
}
function BlockProposals() {
  const [proposal, setProposal] = useState('')
  const [newProposal, setNewProposal] = useState('')
  const [success, setSuccess] = useState(false)
  const [read, setRead] = useState(false)
  const [objProposal, setObjProposal] = useState<objProposal>()
  const {config: configVoteYes} = usePrepareContractWrite({
    address: '0x90593829c40a6Cb650178fCFAb490F97574743E2',
    abi: propContract,
    functionName: 'voteYes',
    args: [proposal]
  })
  const {config: configCreateProposal} = usePrepareContractWrite({
    address: '0x90593829c40a6Cb650178fCFAb490F97574743E2',
    abi: propContract,
    functionName: 'newProposal',
    args: [newProposal],
    onSuccess(data:any){
      setSuccess(false)
    }
  })
  const {data} = useContractRead({
    address: '0x90593829c40a6Cb650178fCFAb490F97574743E2',
    abi: propContract,
    functionName: 'getProposals',
    args: [proposal],
    enabled: read,
    onSuccess(data:any){
      console.log(data)
      setObjProposal({name: BigNumber.from(data[0]).toHexString(), votes: BigNumber.from(data.votes._hex).toNumber(), tier: BigNumber.from(data.tier._hex).toNumber()})
      setRead(!read)
    }
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

  const handleGetProposal = (event: any) => {
    const { value } = event.target
    setProposal(value)
  }
  const handleChange = (event: any) => {
    const { value } = event.target
    setNewProposal(value)
  }
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <input style={{padding: '1rem', width: '25%'}} type="text" placeholder='Proposal name' onChange={(event) => handleGetProposal(event)}/>
      <button style={{padding: '1rem', width: '25%'}} onClick={() => {
        setRead(!read)
        console.log(proposal)
      }
      }>See console</button>
      <div>
        {objProposal ? 
          <div style={{float: 'right'}}>
            <h4>Proposal Name: {objProposal.name}</h4>
            <h4>Proposal Tier: {objProposal.tier}</h4>
            <h4>Proposal Votes: {objProposal.votes}</h4>
            <button style={{padding: '1rem'}} onClick={() => voteYesWrite?.()}>Vote Yes</button>
          </div> 
          :
          null
        }
        </div>
          {success ? 
            <h4>Loading...</h4> 
          :
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <input style={{padding: '1rem', width: '25%'}} type="text" placeholder='Proposal Name' onChange={(event) => handleChange(event)}/>
              <button style={{padding: '1rem', width: '25%'}} onClick={() => {
                createProposalWrite?.()
                setSuccess(true)
              }
              }>Submit Proposal</button>
            </div>
          } 
    </div>
  )
}

export default BlockProposals