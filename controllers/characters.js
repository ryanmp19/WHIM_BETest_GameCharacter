const { request } = require("express")

const { Characters } = require('../models')

class CharacterController {
  static create (req, res, next) {
    res.send('create a char')
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