'use client'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Web3 from "web3"
import { AbiItem } from 'web3-utils'
import gov from '../../lib/utils/json/governorabi.json'
import Vote from './Vote'


let events: any = []
let votes: any = []
let latestBlock: number;

/*
states:
0  Pending,
1  Active,
2  Canceled,
3  Defeated,
4  Succeeded,
5  Queued,
6  Expired,
7  Executed
*/
const web3 = new Web3("https://polygon-mumbai.g.alchemy.com/v2/0sLFPM94rswhQT3_scCwbzaVvzzQlPg7")
const govContract = new web3.eth.Contract(gov as AbiItem[], '0x67f411fd69ff92f7432f8be60f6677e2bcda71df')

function Voting() {
  const [loading, setLoading] = useState(true)
  let voted: boolean = false
  const { data: session, status } = useSession()
  useEffect(() => {
    const getEvents = async () => {
      // get latest block for comparison
      latestBlock = await web3.eth.getBlockNumber()
      // get all votes casted
      const voteCasted = await govContract.getPastEvents('VoteCast', { fromBlock: 0, toBlock: 'latest' })
      voteCasted.forEach((vote: any) => {
        votes.push(vote.returnValues)
      })
      // get all proposals : proposals come back first to last so reverse
      const eventsObj = await govContract.getPastEvents('ProposalCreated', { fromBlock: 0, toBlock: 'latest' })
      eventsObj.forEach((event) => {
        events.push(event.returnValues)
        events.sort((a: any, b: any) => b.startBlock - a.startBlock)
      })

      setLoading(false)
    }
    getEvents()
  }, [])

  return (
    <div style={{ textAlign: 'center' }}>
      {!loading ?
        <div>
          {events.map((event: any, index: number) => {
            let descSplit = event.description.split('\n')
            let vote = votes.filter((x: any) => x.proposalId == event.proposalId)
            return (
              <div key={index}>
                <h1>Proposal ID: {event.proposalId.slice(0, 6)}...{event.proposalId.slice(event.proposalId.split('').length - 4)}</h1>
                <h3>Proposed By: {event.proposer.slice(0, 4)}...{event.proposer.slice(event.proposer.split('').length - 4)}</h3>
                <p>{descSplit[0]}</p>
                <p>{descSplit[1]}</p>
                <Vote props={event} />
              </div>
            )
          })}
        </div>
        :
        <h1>Loading...</h1>
      }
    </div>
  )
}

export default Voting