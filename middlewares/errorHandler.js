module.exports = (error, req, res, next) => {
  console.log('~~~~~~~~~~error handler~~~~~~~~~~');
  console.log(error);
  if (error.name === 'SequelizeDatabaseError') {
    res.status(400).json({
      message: error.message
    })
  }
  res.status(400).json({
    message: 'what are you trying to do?',
    error
  })
}