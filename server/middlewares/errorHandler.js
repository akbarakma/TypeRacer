function errorHandler (err, req, res, next) {
  if (err.name === 'SequelizeValidationError') {
    let msg = [];
    err.errors.forEach(x => {
      msg.push(x.message);
    });
    res.status(400).json({
      status: 400,
      msg
    })
  } else if (err.name === 'BadRequestError') {
    res.status(400).json({
      status: 400,
      msg: err.message
    })
  } else if (err.name === 'JsonWebTokenError') {
    res.status(401).json({
      status: 401,
      msg: 'You need to login first'
    })
  } else if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      status: 401,
      msg: err.message
    })
  } else {
    console.log(err);
    res.status(500).json({
      status: 500,
      msg: 'Internal Server Error'
    })
  }
};

module.exports = errorHandler;