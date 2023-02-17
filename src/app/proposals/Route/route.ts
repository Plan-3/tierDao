/*
Route.ts can't be in same directory as page.tsx 
put inside route folder or api folder
*/
import { NextResponse } from 'next/server'
const requestHeaders = {
  "Content-Type": 'application/json',
  "API-Key": 'somekey' 
}
//typescript headers set object up to pass into a new headers object. Writing headers as normal throws error
const myHeaders: HeadersInit = new Headers(requestHeaders)


export async function POST(request: Request) {
  const res = await fetch('https://data.mongodb-api.com/...', {
    headers: myHeaders,
  });
  const data = await res.json();

  // NextResponse extends the Web Response API
  return NextResponse.json({ data })
}


/*
Route Handlers can use Dynamic Segments to create request handlers from dynamic data.
app/blog/[slug]/route.js	/blog/a	{ slug: 'a' }
app/blog/[slug]/route.js	/blog/b	{ slug: 'b' }
app/blog/[slug]/route.js	/blog/c	{ slug: 'c' }
*/

export async function GET(request: Request, params: any ) {
  const slug = params.slug; //a, b, c
}