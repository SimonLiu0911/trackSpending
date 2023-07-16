const jwt = require('jsonwebtoken');

const checkLoginMiddleware = (req, res, next) => {
  if (!req.session.username) return res.redirect('/login');

  next();
}

const checkTokenMiddleware = (req, res, next) => {
  const token = req.get('token');

  if (!token) {
    return res.json({
      code: '2003',
      msg: 'no token'
    })
  }

  jwt.verify(token, 'mongodbForTrackSpending', (err, data) => {
    if (err) {
      console.log('checkTokenMiddleware error');
      return res.status(401).json({
        code: '2004',
        msg: 'token is wrong'
      })
    }
  });

  next();
}

module.exports = {
  checkLoginMiddleware,
  checkTokenMiddleware
}