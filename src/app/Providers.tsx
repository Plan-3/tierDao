'use client';
// importing react / next
import React from 'react';


//web3 imports
import { createClient, configureChains, WagmiConfig } from 'wagmi'
//goerli and eth mainnet comes with defaultChains
import { polygonMumbai } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  uri: '/api/route'
})
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})



//set up blockchain connections
const { provider, webSocketProvider, chains } = configureChains(
  [polygonMumbai],
  [
    //alchemy connection priority 0 gives top priority
    alchemyProvider({ apiKey: "0sLFPM94rswhQT3_scCwbzaVvzzQlPg7", priority: 0 })
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

export default function Providers({ children }: { children: React.ReactNode }) {

  return (
    <ApolloProvider client={apolloClient}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} theme={darkTheme({
          accentColor: '#202020',
          accentColorForeground: 'white',
          borderRadius: 'none',
        })}>
          {children}
        </RainbowKitProvider>
      </WagmiConfig>
    </ApolloProvider>
  );
}