module.exports = (error, req, res, next) => {
  res.status(400).json({
    message: 'what are you trying to do?',
    error
  })
}