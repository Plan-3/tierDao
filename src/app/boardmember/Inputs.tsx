'use client'
import React, {useState} from 'react'

function Inputs(props: any) {
  const [inputs, setInputs] = useState<any>([])
  return (
    <div>
      {props.props == undefined ?
        <div>
          Loading...
        </div>
        :
        <div>
          {props.props.inputs.length > 0 ?
            <div>
              {
                props.props.inputs.map((x: any, index: number) => {
                  console.log(x)
                  return (
                    <div key={index}>
                      <p>{x.name}</p>
                      <input type="text" placeholder={x.type}/>
                    </div>
                  )
                })
              }
            </div>
            : 
            "No inputs"
          }
          <div>
            <button> Start Vote</button>
          </div>
        </div>
      }

    </div >
  )
}

export default Inputs