'use strict';
const { hash } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Username cannot be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email cannot be empty'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password cannot be empty'
        },
        len: {
          args: [6,20],
          msg: 'Password length need to be between 6 and 20'
        }
      }
    },
    score: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true
      }
    }
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        return hash(instance.password)
          .then(hashed => {
            instance.password = hashed;
          });
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};