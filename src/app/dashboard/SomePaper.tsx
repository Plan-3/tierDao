'use client'
import { getDownloadURL, ref, getStorage } from 'firebase/storage'
import React, {useState, useEffect} from 'react'
import Link from 'next/link'

interface documents {
  i: number,
  name: string,
}
function SomePaper(someProps: any) {
  console.log(someProps)
  const storage = getStorage()
  const [url, setUrl] = useState<string[]>([])
  const [documents, setDocuments] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    for (let index = 0; index < someProps.props.length; index++) {
      const element = someProps.props[index];
      url.push(element._location.path_)
    }
  },[])
  const getURL = async (path: string) => {
    const pathRef = ref(storage, path)
    const url = await getDownloadURL(pathRef)
    documents.push(url)
    if(documents.length >= someProps.props.length) setLoading(false)
  }

  if(url.length > 0) {
    for (let index = 0; index < url.length; index++) {
      const element = url[index];
      getURL(element)
    }
  }
  
  return (
    <div>
      {!loading ?
        documents.map((item: any, index: number) => {
          return(
            <div key={index}>
              <Link href={item}>{item.slice(80).split('.pdf')[0]}</Link>
            </div>
          )
        })
        :
        <div>Loading... if loading is taking longer than 30 seconds click <button onClick={() => setLoading(!loading)}>here</button></div>
        }
    </div>
  )
}

export default SomePaper