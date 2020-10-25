'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Characters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Characters.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    character_code: {
      type: DataTypes.INTEGER,
      validate: {
        isIn: {
          args: [[ 1, 2, 3 ]],
          msg: 'Invalid Character Code!'
        }
      }
    },
    power: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: {
          args: 1,
          msg: 'Power minimum is 1'
        }
      }
    },
    value: DataTypes.DECIMAL(10, 2)
  }, {
    sequelize,
    modelName: 'Characters',
    hooks: {
      beforeCreate: (character, opts) => {
        switch (character.character_code) {
          case 1:
            character.value = 1.5 * character.power
            break
          case 2:
            character.value = 2 + (1.1 * character.power)
            break
          case 3:
            character.value = character.power < 20 ? 2 * character.power : 3 * character.power
            break
        }
      }
    }
  });
  return Characters;
};