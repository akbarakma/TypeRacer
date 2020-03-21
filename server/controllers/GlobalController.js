const axios = require('axios');
const { User } = require('../models');
const createError = require('../helpers/createError');
const { compare } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class GlobalController {
  static async getQuotes (req, res, next) {
    const url = process.env.API_QUOTE;
    axios({
      method: 'GET',
      url,
      jsonp: false
    })
      .then(({ data }) => {
        res.status(200).json(data);
      }).catch(err => {
        next(err);
      });
  };
  static async register (req, res, next) {
    try {
      const { username, email, password } = req.body;
      const usernameRegistered = await User.findOne({ where: { username } });
      if (usernameRegistered) {
        throw createError(400, 'Username has already been registered');
      }
      const emailRegistered = await User.findOne({ where: { email } });
      if (emailRegistered) {
        throw createError(400, 'Email has already been registered');
      }
      const obj = { username, email, password };
      const newUser = await User.create(obj);
      res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  };
  static async login (req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw createError(400, 'Wrong username / password');
      }
      const passwordVerification = await compare(password, user.password);
      if (!passwordVerification) {
        throw createError(400, 'Wrong username / password');
      } else {
        const token = generateToken({ id: user.id });
        res.status(200).json({ token });
      }
    } catch (err) {
      next(err);
    }
  }
  static async addScore (req, res, next) {
    const score = Number(req.params.score);
    const obj = { score }
    await User.update(obj, { where: { id: req.userData.id } });
    res.status(201).json({ msg: 'Success add score' });
  };
};

module.exports = GlobalController;