/*
server only is a package 
that will force an error
explaining code can only be
used on server if any 
client components try and use
it
alternatively client-only
will do the same thing for
any client operations trying
to be ran on the server
*/

import 'server-only'

export async function getData() {
  let res = await fetch('getsomedatahere')
}