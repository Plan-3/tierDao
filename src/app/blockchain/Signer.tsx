'use client'
import React, { useEffect } from 'react'
import { useAccount } from 'wagmi'
import { watchContractEvent, signMessage, signTypedData } from '@wagmi/core'
import { ethers, VoidSigner } from 'ethers'
import Web3 from 'web3'
import Verify from '../../lib/utils/json/Verifier.json'



function Signing() {
  const [whoAmI, setWhoAmI] = React.useState(false)
  let win: any;
  const getWindow = async () => {
    let newWindow = new Promise((resolve, reject) => {
      try {
        if (typeof window !== 'undefined') {
          resolve
          win = window.ethereum
          console.log(win)
        }
      }
      catch (e) {
        reject(e)
      }
    })
  }
  getWindow()
  const provider = new ethers.providers.Web3Provider(win as any)
  const signer = provider.getSigner()
  const verifier = new ethers.Contract('0x148Bd32591Aa339d367d3b40b573202D48234b2F', Verify, signer)
  const { address } = useAccount()

  const sign = async () => {
    let signature = await signer.signMessage("By signing this you agree to the terms and conditions. Which are giving your soul to all mighty Atheismo")
    let sig = signature.substr(2)
    let r = '0x' + sig.substring(0, 64) // first 32 bytes
    let s = '0x' + sig.substring(64, 128) // next 32 bytes
    let v = parseInt(sig.substring(128, 130), 16) // final byte must be a turned into a decimal and must be between 27 and 28
    // hash of the message prefixes with special message to prevent signing arbitrary data
    let hash = ethers.utils.hashMessage("By signing this you agree to the terms and conditions. Which are giving your soul to all mighty Atheismo")
    console.log(`r ${r}, \n s ${s}, \n v ${v} \n hash ${hash}`)
    setWhoAmI(await verifier.isSigned(address, hash, v, r, s))
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <button style={{ padding: '.4rem', margin: '.4rem' }} onClick={() => sign()}>Sign</button>
      {(whoAmI === true) ? <p>True</p> : <p>False</p>}

    </div>
  )
}

export default Signing