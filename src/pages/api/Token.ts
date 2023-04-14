// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({req})
  if(token) {
    res.status(200).json({token})
  }
  else {
    res.status(401).json({error: "Not authorized"})
  }
}
