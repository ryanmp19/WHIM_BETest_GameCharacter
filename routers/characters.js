const router = require('express').Router()
const CharacterController = require('../controllers/characters')

router.get('/characters', CharacterController.getAll)
router.post('/characters', CharacterController.create)
router.put('/characters/:id(\\d+)',  CharacterController.update)

module.exports = router