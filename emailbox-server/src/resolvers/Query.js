function feed(parent, args, context, info) {
	return context.db.query.emails({}, info)
}

module.exports = {
	feed,
}