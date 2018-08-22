module.exports = (query, args) => {
  delete args.skip
  delete args.limit

  return Object.assign(query, args)
}
