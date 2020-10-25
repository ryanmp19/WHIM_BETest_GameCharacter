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
    let payload = req.body

    if (!payload.name || payload.name === '') delete payload.name
    if (!payload.power || payload.power === '') delete payload.power

    let { id } = req.params

    if ('character_code' in payload || 'value' in payload) next({ name: 'ForbiddenAction' })
    else {
      Characters.update(payload, {
        where: { id },
        returning: true,
        individualHooks: true
      })
        .then(updated => {
          if (updated[0] === 0) {
            next({ name: 'InvalidCharacterID' })
          } else {
            delete updated[1][0].dataValues.createdAt
            delete updated[1][0].dataValues.updatedAt
            res.status(200).json({
              message: `Character ID:${updated[1][0].dataValues.id} successfully updated`,
              updated: updated[1][0].dataValues,
            })
          }
        })
        .catch(e => next(e))
    }
  }
}

module.exports = CharacterController