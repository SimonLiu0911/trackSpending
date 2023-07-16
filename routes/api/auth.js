const express = require('express');
const UserModel = require('../../models/UserModel');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

const router = express.Router();

// login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const data = {
    username,
    password: md5(password)
  }

  UserModel.findOne(data)
    .then((result) => {
      if (result === null) {
        return res.json({
          code: '2002',
          msg: 'account or password error'
        })
      }

      const token = jwt.sign(
        {
          username: result.username,
          _id: result._id
        },
        'mongodbForTrackSpending',
        { expiresIn: 60 * 60 * 24 * 7 }
      );

      res.json({
        code: '0',
        msg: 'success',
        data: {
          token
        }
      })
    })
    .catch((err) => {
      res.json({
        code: '2001',
        msg: 'no user'
      })
    })
});

// logout
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.render('success', {
      msg: 'success to logout',
      url: '/login'
    })
  })
})

module.exports = router;
