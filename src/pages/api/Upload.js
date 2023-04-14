//import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import fs from 'fs'
import path from 'path'
import { MongoClient } from 'mongodb'
import { initializeApp } from 'firebase/app'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { getAnalytics } from 'firebase/analytics'

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
const analytics = getAnalytics(app)
// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();

// Create a storage reference from our storage service
const storageRef = ref(storage);

/* 
//Create a child reference
const imagesRef = ref(storage, 'images');
// imagesRef now points to 'images'

// Child references can also take paths delimited by '/'
const spaceRef = ref(storage, 'images/space.jpg');
// spaceRef now points to "images/space.jpg"
// imagesRef still points to "images
//https://firebase.google.com/docs/storage/web/create-reference?authuser=0
*/ 


// const MONGODB_URI: string = <string>process.env.MONGODB_URI
export default async function handler(req, res) {
  // if (req.method == 'GET') {
  //   try {
  //     const client = await MongoClient.connect(MONGODB_URI)
  //     const db = client.db()
  //     const files = await db.collection('files').findOne()
  //     res.send(files)
  //   } catch (err) {
  //     res.send(500)
  //     console.log(err)
  //   }
  // } else {
  //   try {
  //     const client = await MongoClient.connect(MONGODB_URI)
  //     const db = client.db()
  //     db.collection('files').insertOne({ file: req.body })
  //     res.send(200)
  //   } catch (err) {
  //     res.send(500)
  //     console.log(err)
  //   }
  // }
}