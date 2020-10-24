const router = require('express').Router()
const CharacterRouter = require('./characters')

router.get('/', (req, res, next) => res.send('This server is running'))
router.use('/api/v1', CharacterRouter)

// 404 Handler
router.use(function (req, res, next) {
  res.status(404).json({
    message: 'API not found!'
  })
})

module.exports = router