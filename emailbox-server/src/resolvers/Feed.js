function emails(parent, args, context, info) {
  const { emailIds } = parent
  return context.db.query.emails({ where: { id_in: emailIds } }, info)
}

module.exports = {
  emails,
}