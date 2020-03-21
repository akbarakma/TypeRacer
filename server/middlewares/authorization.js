const { User } = require('../models');
const createError = require('../helpers/createError');

const authorization = async (req, res, next) => {
  try {
    const id = req.userData.id;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw createError(401, 'You need to login first');
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}
module.exports = authorization;