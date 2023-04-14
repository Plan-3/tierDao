'use client'
import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react"
import { SiweMessage } from "siwe"
import { useAccount, useConnect, useNetwork, useSignMessage, useDisconnect } from "wagmi"
import { InjectedConnector } from 'wagmi/connectors/injected'
import { useEffect, useState } from "react"
import Link from "next/link"

function Siwe() {
  const { signMessageAsync } = useSignMessage()
  const { chain } = useNetwork()
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const {disconnect} = useDisconnect()
  const { data: session, status } = useSession()
  const handleLogin = async () => {

    try {
      const callbackUrl = "/blockchain"
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId: chain?.id,
        nonce: await getCsrfToken(),
      })
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      })
      signIn("credentials", {
        message: JSON.stringify(message),
        redirect: false,
        signature,
        callbackUrl,
      })
    } catch (error) {
      window.alert(error)
    }
  }
  console.log(session?.user.name)

  return (
    <>
      {session ?
         <div>
          <button onClick={() =>{
            disconnect()
            signOut()
          } }>Sign Out</button>
            <Link href="/boardmember"> Member Access </Link>
          </div> 
        :
        <div>
          <button onClick={async () => await getCsrfToken()}>token</button>
          <button
            onClick={(e) => {
              e.preventDefault()
              if (!isConnected) {
                connect()
              } else {
                handleLogin()
              }
            }}
          >
            Sign-in
          </button>
        </div> 
        
        }
    </>
  )
}

export async function getServerSideProps(context: any) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}



export default Siwe