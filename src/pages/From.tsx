import React, {useState} from 'react'

function From() {
  let [c, setC] = useState(0)
  return (
    <div onClick={() => setC(c++)}>
      {c}
    </div>
  )
}

export default From