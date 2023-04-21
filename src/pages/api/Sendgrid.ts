// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import sgMail from '@sendgrid/mail'
import fs from 'fs'

//convert to string
const SENDGRID_API: string = <string>process.env.SENDGRID_API
sgMail.setApiKey(SENDGRID_API)




export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
  
  ) {
    const attachment = fs.readFileSync(req.body.file)
    console.log(req.body);
    const msg = {
      //
      to: req.body.emails,
      from: req.body.email,
      subject: req.body.subject,
    //   attachments: [{
    //     content: attachment.toString('base64'),
    //     filename: req.body.filename,
    //     type: req.body.filetype,
    //     disposition: 'attachment'
    // }],
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
