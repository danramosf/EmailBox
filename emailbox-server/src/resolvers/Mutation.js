const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function signup(parent, args, context, info) {
	//Encrpyting the user's password using bcrypt
	const password = await bcrypt.hash(args.password, 10)
	//Storing the new user in the database, using the Prisma Binding instance
	const user = await context.db.mutation.createUser({
		data: { ...args, password },
	}, `{ id }`)

	//Generating a jwt using the APP_SECRET
	const token = jwt.sign({userId: user.id }, APP_SECRET)

	return {
		token,
		user,
	}
}

async function login(parent, args, context, info) {
	//Retrieving the user with the specified email address from the Prisma Binding instance
	const user = await context.db.query.user({ where: { emailAddress: args.emailAddress } }, `{ id password }`)
	//Error if there is no user with the specified email
	if(!user) {
		throw new Error('No such user found')
	}
	//Validating the password
	const valid = await bcrypt.compare(args.password, user.password)
	//Return an error if the passwords doesn't match
	if(!valid){
		throw new Error('Invalid password')
	}
	
	const token = jwt.sign({ userId: user.id }, APP_SECRET)

	return {
		token,
		user,
	}
}

//Add new email
function post(parent, args, context, info){
	//Retrieving the id of the user stored in the jwt
	const userId = getUserId(context)
	return context.db.mutation.createEmail(
	{
		data: 
		{
			content: args.content,
			subject: args.subject,
			read: args.read,
			sentBy: args.sentBy,
			sentTo: { connect: { id: userId } },
		},
	}, info,)
}

function updateEmailRead(parent, args, context, info) { 
	
	const userId = getUserId(context)
	return context.db.mutation.updateEmail(
	{
		data:
		{
			read: args.read
		},
		where:
		{
			id: args.emailId
		},
	}, info,)
}

module.exports = {
	signup,
	login,
	post,
	updateEmailRead,
}