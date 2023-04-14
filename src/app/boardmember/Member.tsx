'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { useAccount } from 'wagmi'
import Link from 'next/link'
import Board1 from './Board1'
import Board2 from './Board2'

function Member() {
  const { data: session, status } = useSession()
  const { address } = useAccount()
  return (
    <div>
      <h1><Link href={'/'}> Home</Link></h1>
      <div>
        {session?.user.name == '0xb94ae34DE09B1EeF75E18e8Ed17F91C32E9B0A9f' ?
          <div>
            <Link href='/secretary'>Welcome Secretary</Link>
          </div>
          :
          (session?.user.name == '0x7AD00f47AD50194d6d54b2F8605E7d2803795BF4') ?
            <div>
              <Board1 />
            </div>
            :
            (session?.user.name == '0xB535c6e924b591013c6027Dc66aAEc5B634ce567') ?
              <div>
                <Board2 />
              </div>

              : "You are not authorized to view this page"
        }
      </div>
    </div>
  )
}

export default Member