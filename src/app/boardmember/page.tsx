import React from 'react'
import Member from './Member'

export const revalidate = 60
function page() {

  return (
    <div>
      <Member />
    </div>
  )
}

export default page