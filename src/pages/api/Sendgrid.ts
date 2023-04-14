// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import sgMail from '@sendgrid/mail'

//convert to string
const SENDGRID_API: string = <string>process.env.SENDGRID_API
sgMail.setApiKey('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')




export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
  
  ) {
    const msg = {
      //
      to: req.body.emails,
      from: req.body.email,
      subject: req.body.subject,
      text: req.body.text,
      html: req.body.text
    }
    sgMail.send(msg)
    .then(() => {
      console.log('Email sent')
      res.send(200)
    })
    .catch(error => {
      console.error(error)
      res.send(500)
    })
}
