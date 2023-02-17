'use client'
import React, {useState} from 'react'
import { useQuery } from '@apollo/client';
import { QUERY_PROPOSAL } from '@/lib/utils/graphql/Queries';
import { useAccount, useBalance } from 'wagmi';

function Voting() {
  const [tier, setTier] = useState(true)
  //const { data, loading, error } = useQuery(QUERY_PROPOSAL)
  const {address} = useAccount()
  
  const { data: wagmiData } = useBalance({
    address: address, 
    token: '0xBb767f678519007a4d86D95ce621E25A3915b2Ef', 
      onSettled: (data) => {
        if(Number(data?.formatted) > 0.0) {
          setTier(false)
        }
      }
    })
    // if (loading) return <p>Loading...</p>
    
    // const { proposals } = data
    // console.log(data);
  return (
    <div>
      <div>
        <h4>You have a weighted vote of: {wagmiData?.formatted} </h4>
      </div>
      {/* {proposals.proposal.map((proposal: any, index: number) => {
        if(proposal.options.length == 0){
          return
        } 
          return(
            proposal.options.map((option: any, index: number) => {
              console.log(option);
              return (
                <div key={index}>
                  <button>{option}</button>
                </div>
              )
            })
          ) 
      })} */}
    </div>
  )
}

export default Voting