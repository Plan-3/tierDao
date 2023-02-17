import './globals.css'
import Providers from './Providers'
// import { dbConnect } from '@/lib/utils/mongo/Database'
import { ApolloServer } from 'apollo-server'
import { typeDefs } from '@/lib/utils/graphql/typeDefs'
import resolvers from '@/lib/utils/graphql/Resolvers'

// const mocks = {
//   Query: () =>({
//     proposal: () => [...new Array(6)]
//   }),
//   Proposals: () => ({
//     name: () => 'prop 1',
//     quorum: () => 2,
//     tier: () => 1
//   })
// }
const server = new ApolloServer({typeDefs, resolvers})
const PORT = process.env.PORT || 8708

// dbConnect()

server.listen(PORT).then(() => {console.log(`
  🚀  Server is running!
  🔉  Listening on ${PORT}
  📭  Query at http://localhost:${PORT}`
)})
/*
A layout is UI that is shared between multiple pages. On navigation, layouts preserve state, remain interactive, and do not re-render. Layouts can also be nested.
this is the root layout that is required only root needs head and html
this replaces old next.js _app.js and _document.js
*/


export default async function RootLayout({
  children, //will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        {/* 
          To wrap Providers and context use on server
          create both into a client component with use client 
          statement wrap base layout with new client component
          try to wrap as far down tree as possible
        */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
