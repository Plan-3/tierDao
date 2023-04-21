import React from 'react'
import Document from './Document'

export const revalidate = 10
function page() {
  return (
    <div>
      <h1>Welcome to your account</h1>
      <Document />
    </div>
  )
}

export default page