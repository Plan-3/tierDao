'use client'
import React, { useEffect } from 'react'
import { useAccount } from 'wagmi'
import { watchContractEvent, signMessage, signTypedData } from '@wagmi/core'
import { ethers, VoidSigner} from 'ethers'
import Web3 from 'web3'
import Verify from '../../lib/utils/json/verifywithemitabi.json'
import governor from '../../lib/utils/json/governorabi.json'



function Signing() {
  const [whoAmI, setWhoAmI] = React.useState(false)
  let provider:any;
  let signer:any;
  const getWindow = async () => {
    let newWindow = new Promise((resolve, reject) => {
      try {
        if (typeof window !== 'undefined') {
          resolve
         provider = new ethers.providers.Web3Provider(window.ethereum as any)
         signer = provider.getSigner()
        }
      }
      catch (e) {
        reject(e)
      }
    })
  }
  getWindow()
  const verifier = new ethers.Contract('0xDF48a208449937dB8303bFE7FC84ca25902C4039', Verify, signer)
  const gov = new ethers.Contract('0xca937637769D0e893492Aa9eBB8CCDEc620E38C1', governor, provider)
  const { address } = useAccount()
  const getLogs = async () => {
    let result = await fetch(`https://api-testnet.polygonscan.com/api?module=logs&action=getLogs&fromBlock=30000000&toBlock=40000000&address=0xca937637769D0e893492Aa9eBB8CCDEc620E38C1&topic0=0x7d84a6263ae0d98d3329bd7b46bb4e8d6f98cd35a7adb45c274c8b7fd5ebd5e0&apikey=39XJIPVAQ6T176BAF8UUDEZBNPBX2D4BK3`)
    let data = await result.json()
    console.log(data)
  }
  const sign = async () => {
    let signature = await signer.signMessage("By signing this you agree to the terms and conditions.")
    let sig = signature.substr(2)
    let r = '0x' + sig.substring(0, 64) // first 32 bytes
    let s = '0x' + sig.substring(64, 128) // next 32 bytes
    let v = parseInt(sig.substring(128, 130), 16) // final byte must be a turned into a decimal and must be between 27 and 28
    // hash of the message prefixes with special message to prevent signing arbitrary data
    let hash = ethers.utils.hashMessage("By signing this you agree to the terms and conditions.")
    console.log(`r ${r}, \n s ${s}, \n v ${v} \n hash ${hash}`)
    /* isSigned takes 3 arguments: an address, the hash of the message, and the signature 
    compares signature to the address first argument is address we want to make sure is signing like Secretary
    */
    setWhoAmI(await verifier.isSigned('0xb94ae34DE09B1EeF75E18e8Ed17F91C32E9B0A9f', hash, v, r, s))
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <button style={{ padding: '.4rem', margin: '.4rem' }} onClick={() => sign()}>Sign</button>
      {(whoAmI === true) ? <p>True</p> : <p>False</p>}
      <button onClick={() => getLogs()}>here</button>
    </div>
  )
}
export const sign = async (address: any, signer:any, verifier:any) => {
  let whoAmI:boolean;
  let signature = await signer.signMessage("By signing this you agree emails have been sent")
  let sig = signature.substr(2)
  let r = '0x' + sig.substring(0, 64) // first 32 bytes
  let s = '0x' + sig.substring(64, 128) // next 32 bytes
  let v = parseInt(sig.substring(128, 130), 16) // final byte must be a turned into a decimal and must be between 27 and 28
  // hash of the message prefixes with special message to prevent signing arbitrary data
  let hash = ethers.utils.hashMessage("By signing this you agree to the terms and conditions.")
  console.log(`r ${r}, \n s ${s}, \n v ${v} \n hash ${hash}`)
  whoAmI = (await verifier.isSigned(address, hash, v, r, s))
  return whoAmI
}
export default Signing