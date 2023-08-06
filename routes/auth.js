const express = require('express');
const UserModel = require('../models/UserModel');
const md5 = require('md5');

const router = express.Router();

// 註冊
router.get('/register', (req, res) => {
  res.render('auth/register');
});

router.post('/register', (req, res) => {
  // password 加密
  const data = {
    ...req.body,
    password: md5(req.body.password)
  };
  UserModel.create(data)
    .then((result) => {
      res.render('success', {
        msg: '註冊成功',
        url: '/login'
      })
    })
    .catch((err) => res.status(500).send('這冊失敗'))
})

// 註冊
router.get('/login', (req, res) => {
  res.render('auth/login');
});

// 登錄
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const data = {
    username,
    password: md5(password)
  }
  UserModel.findOne(data)
    .then((result) => {
      if (result === null) return res.send('號密碼錯誤');

      // 寫入session
      req.session.username = result.username;
      req.session._id = result._id;

      res.render('success', {
        msg: 'success to login',
        url: '/account'
      });

    })
    .catch((err) => {
      console.log(err);
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
