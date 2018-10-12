const newEmail = {
  subscribe: (parent, args, ctx, info) => {
    return ctx.db.subscription.email(
      { },
      info,
    )
  },
}

module.exports = {
  newEmail,
}