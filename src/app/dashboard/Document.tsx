'use client'
import React, { useState, useEffect } from 'react'
import { initializeApp } from 'firebase/app'
import { getStorage, ref, listAll } from 'firebase/storage'
import Link from 'next/link'
import SomePaper from './SomePaper'

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


function Document() {
  const [items, setItems] = useState<any>(undefined)
  const [loading, setLoading] = useState<boolean>(true)
  const getStuff = async () => {
    let newItems = await listAll(ref(storage, 'documents'))
    setItems(newItems)
    setLoading(false)
  }
  useEffect(() => {
    getStuff()
  }, [])
 
  return (
    <div>
      {loading ?
        <div>Loading...</div>
        :
        <SomePaper props={items.items}/>
      }
    </div>
  )
}

export default Document