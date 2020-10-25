const { Characters } = require('../models')

class CharacterController {
  static create (req, res, next) {
    let {
      name,
      character_code,
      power
    } = req.body

    Characters.create({
      name,
      character_code: Number(character_code),
      power: Number(power)
    })
      .then(created => {
        delete created.dataValues.createdAt
        delete created.dataValues.updatedAt
        
        res.status(201).json({
          message: 'Character successfully created',
          created
        })
      })
      .catch(e => next(e))
  }

  static async getAll (req, res, next) {
    const characters = await Characters.findAll()
    res.status(200).json({ characters })
  }

  static update (req, res, next) {
    res.send('update')
  }
}

module.exports = CharacterController