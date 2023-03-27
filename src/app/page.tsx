import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })



export default function Home() {
  return (
    <main style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
     <h1>Plan3 Options DAO</h1>
     <div style={{display: 'flex', justifyContent: 'space-around', padding: '1rem 4rem', width:'80%'}}>
      <h2><Link href='/proposals'>See Proposals</Link></h2>
      <h2 style={{textDecoration: 'line-through'}}><Link href='/blockchain'>Request a Token</Link></h2>
     </div>
     <div>
      <h2><Link href='/operating'>Create Operating Agreement</Link></h2>
     </div>
    </main>
  )
}
