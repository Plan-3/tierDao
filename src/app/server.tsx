import {ApolloServer} from '@apollo/server'
import {startServerAndCreateNextHandler} from '@as-integrations/next'
import { typeDefs } from '@/lib/utils/graphql/typeDefs'
import resolvers from '@/lib/utils/graphql/Resolvers'

const server = new ApolloServer({
  typeDefs,
  resolvers
})

export default startServerAndCreateNextHandler(server)