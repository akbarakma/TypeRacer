const { verifyToken } = require('../helpers/jwt');
function authentication (req, res, next) {
  try {
    const { token } = req.headers;
    const decoded = verifyToken(token);
    req.userData = decoded;
    next();
  } catch (err) {
    next(err);
  }

};
module.exports = authentication;