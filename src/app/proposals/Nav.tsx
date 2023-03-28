'use client';

import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link';

function Nav() {
  return (
    <div>
      <Link href="/">Home</Link>
      <ConnectButton />
    </div>
  )
}

export default Nav