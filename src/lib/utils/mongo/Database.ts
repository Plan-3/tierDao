import mongoose from 'mongoose'

const MONGODB_URI: string = <string>process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment varaible inside .env.local"
  );
}


export async function dbConnect() {
    await mongoose.connect(MONGODB_URI)
    console.log(`Connected <-------------->`)
  }
