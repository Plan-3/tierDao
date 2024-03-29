'use client';
// importing react / next
import React from 'react';


//web3 imports
import { createClient, configureChains, WagmiConfig } from 'wagmi'
//goerli and eth mainnet comes with defaultChains
import { bsc, polygonMumbai } from 'wagmi/chains'
import { jsonRpcProvider } from '@wagmi/core/providers/jsonRpc'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { AppProps } from 'next/app';
import { SessionProvider } from "next-auth/react"

const httpLink = createHttpLink({
  //production uri /api/route local uri http://localhost:8008
  // comment out main layout server when going to production
  uri: 'api/route'
})
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})



//set up blockchain connections
const { provider, webSocketProvider, chains } = configureChains(
  [polygonMumbai, bsc],
  [
    //alchemy connection priority 0 gives top priority
    jsonRpcProvider({
      priority: 0,
      rpc: (chain) => ({
        http: `https://rpc.ankr.com/bsc`,
      })
    }),
    alchemyProvider({ apiKey: "0sLFPM94rswhQT3_scCwbzaVvzzQlPg7", priority: 1 }),
  ])

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
})

const wagmiClient = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
  connectors
})

export default function Providers({children}: { children: React.ReactNode}) {
  return (
    <ApolloProvider client={apolloClient}>
      <WagmiConfig client={wagmiClient}>
        <SessionProvider>
          <RainbowKitProvider chains={chains} theme={darkTheme({
            accentColor: '#202020',
            accentColorForeground: 'white',
            borderRadius: 'none',
          })}>
            {children}
          </RainbowKitProvider>
        </SessionProvider>
      </WagmiConfig>
    </ApolloProvider>
  );
}