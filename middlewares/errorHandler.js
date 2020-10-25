module.exports = (error, req, res, next) => {
  if (error.name === 'SequelizeDatabaseError') {
    res.status(400).json({
      message: error.message
    })
  } else if (error.name === 'SequelizeValidationError') {
    res.status(400).json({
      message: error.errors[0].message
    })
  } else if (error.name === 'InvalidCharacterID') {
    res.status(404).json({
      message: 'Character not found!'
    })
  } else if (error.name === 'ForbiddenAction') {
    res.status(403).json({
      message: 'Requested Action is Forbidden!'
    })
  } else {
    res.status(500).json({
      message: 'Internal Server Error',
      error
    })
  }
}