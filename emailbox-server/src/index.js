//Importing Prisma
const { Prisma } = require('prisma-binding')
// Importing the graphql-yoga to my server
const { GraphQLServer } = require('graphql-yoga')
//Importing the resolvers
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Subscription = require('./resolvers/Subscription')
const AuthPayload = require('./resolvers/AuthPayload')
const Feed = require('./resolvers/Feed')

// Resolvers
const resolvers = {
	Query,
	Mutation,
	Subscription,
	AuthPayload,
	Feed,
}

// Bundles the schema and the resolvers and sends it to the server
const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers,
	context: req => ({
		...req,
		db: new Prisma({
			typeDefs: 'src/generated/prisma.graphql',
			endpoint: 'https://us1.prisma.sh/danramosf-4007cb/database/dev',
			secret: 'mysecret123',
			debug: true,
		}),
	}),
})

server.start(() => console.log(`Server is runnig on http://localhost:4000`))