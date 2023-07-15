const express = require('express');
const router = express.Router();
const UserModel = require('../../models/UserModel');
const md5 = require('md5');

// 註冊
router.get('/reg', (req, res) => {
  res.render('auth/reg');
});

router.post('/reg', (req, res) => {
  // password 加密
  const data = {
    ...req.body,
    password: md5(req.body.password)
  };
  UserModel.create(data)
    .then((result) => {
      res.render('success', { msg: '註冊成功', url: '/login' })
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

      res.render('success', { msg: '登錄成功', url: '/login' });
    })
    .catch((err) => {
      console.log(err);
    })
});

module.exports = router;
