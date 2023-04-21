'use client'
import { useSession } from "next-auth/react"
import { useState } from 'react'
import Link from "next/link"
import { useAccount } from "wagmi"
import { ethers } from "ethers"
import Verify from "../../lib/utils/json/Verifier.json"
import { sign } from "../blockchain/Signer"
import { initializeApp } from 'firebase/app'
import { getStorage, ref, uploadBytesResumable, getDownloadURL, uploadBytes } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCpgGUbjmpz3AdIimOXmFjQy-7bDO8ryuo",
  authDomain: "tiereddao.firebaseapp.com",
  projectId: "tiereddao",
  storageBucket: "tiereddao.appspot.com",
  messagingSenderId: "70234376837",
  appId: "1:70234376837:web:a73b1df0cbbf1fefc3b7ec",
  measurementId: "G-KD1N2CYYDB"
}

const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(app);

// Create a storage reference from our storage service
const storageRef = ref(storage);
//create a child reference

function SecretaryEmail() {
  const [emails, setEmails] = useState<string[]>([])
  const [text, setText] = useState<string>('')
  const [subject, setSubject] = useState<string>('')
  const [file, setFile] = useState<any>([])
  const email = 'tylerr@plan3.io'
  const { address } = useAccount()
  let signer: any
  let provider: any

  const { data: session, status } = useSession()

  interface Message {
    emails: string[],
    email: string,
    subject: string,
    text: string
  }

  const getWindow = async () => {
    let newWindow = new Promise((resolve, reject) => {
      try {
        if (typeof window !== 'undefined') {
          resolve
          provider = new ethers.providers.Web3Provider(window.ethereum as any)
          signer = provider.getSigner()
        }
      }
      catch (e) {
        reject(e)
      }
    })
  }
  getWindow()
  const verifier = new ethers.Contract('0x148Bd32591Aa339d367d3b40b573202D48234b2F', Verify, signer)

  const handleChange = (event: any) => {
    switch (event.target.name) {
      case 'emails':
        setEmails(event.target.value.split(','))
        break
      case 'subject':
        setSubject(event.target.value)
        break
      case 'text':
        setText(event.target.value)
        break
      default:
        break
    }
  }
  const tryEmail = () => {
    const message: Message = {
      emails,
      email,
      subject,
      text
    }
    console.log(message);
    
    fetch('/api/Sendgrid', {
      method: 'POST',
      body: JSON.stringify(message),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  const handleFileChange = async (event: any) => {
    setFile(event.target.files[0])
    // const reader = new FileReader()
    // reader.onload = (evt) => {
    //   let dataUri = `data:${event.target.files[0].type};base64,${btoa(evt.target?.result as string)}`
    //   console.log(dataUri);
    // }  
  }
  const handleFileUpload = () => {
    const docuRef = ref(storage, `documents/${file[0].name}`)
    uploadBytes(docuRef, file[0]).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    })
  }

  if (session?.user.name == '0xb94ae34DE09B1EeF75E18e8Ed17F91C32E9B0A9f') {
    return (
      <div>
        <h1>Hello{session?.user.name} </h1>
        <div>
          <input type="text" placeholder="emails" name="emails" onChange={(event) => handleChange(event)} />
          <input type="text" name="subject" placeholder="subject" onChange={(event) => handleChange(event)} />
          <input type="text" name="text" placeholder="text" onChange={(event) => handleChange(event)} />
          <button onClick={async () => {
            await sign(address, signer, verifier)
            tryEmail()
          }}>Send Emails Out</button>
        </div>
        <div>
            <input type="file" name="" id="" onChange={(event) => {
              handleFileChange(event)
            }} />
            <button onClick={async () => {
              await sign(address, signer, verifier)
              handleFileUpload()
            }}>Upload</button>
        </div>
      </div>
    )
  } else {
    return <div>Not Authorized <Link href='/'>Back Home</Link> </div>
  }
}


export default SecretaryEmail