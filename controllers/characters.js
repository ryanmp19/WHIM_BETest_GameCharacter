const { request } = require("express")

const { Character } = require('../models')

class CharacterController {
  static create (req, res, next) {
    res.send('create a char')
  }

  static getAll (req, res, next) {
    res.send('get all characters')
  }

  static update (req, res, next) {
    res.send('update')
  }
}

module.exports = CharacterController