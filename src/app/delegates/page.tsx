import React from 'react'
import Link from 'next/link'
import Delegates from "./Delegates"

function page() {
  
  return (
    <div>
      <h1><Link href={'/'}>This is from the server</Link> </h1>
      <Delegates />
    </div>
  )
}

export default page