async function feed(parent, args, ctx, info) {
  const { filter, first, skip } = args // destructure input arguments
  const where = filter
    ? { OR: [{ url_contains: filter }, { description_contains: filter }] }
    : {}

  const allEmails = await ctx.db.query.emails({})
  const count = allEmails.length

  const queriedEmails = await ctx.db.query.emails({ first, skip, where })

  return {
    emailIds: queriedEmails.map(email => email.id),
    count
  }
}

module.exports = {
  feed,
}
