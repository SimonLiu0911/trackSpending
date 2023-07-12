const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const moment = require('moment');
const AccountModel = require('../models/AccountModel');

router.get('/account', (req, res, next) => {
  AccountModel.find().sort({ time: -1 }).exec()
    .then((result) => {
      const accounts = result.map((item) => {
        return {
          ...item._doc,
          time: moment(item._doc.time).format('YYYY-MM-DD')
        }
      })
      console.log(accounts);
      res.render('account', { accounts });
    })
    .catch((err) => {
      res.status(500).send('讀取失敗~~~')
    })
});

router.get('/account/create', (req, res, next) => {
  res.render('list');
});

router.post('/account', (req, res, next) => {
  const data = {
    ...req.body,
    time: moment(req.body.time).toDate()
  };

  AccountModel.create(data)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      return res.status(500).send('插入失敗');
    })
});

router.get('/account/:id', (req, res, next) => {
  // 獲取 param 的 id 的參數
  const { id } = req.params;

  AccountModel.deleteOne({ _id: id })
    .then((result) => {
      res.render('success', {
        msg: 'success to delete',
        url: '/account'
      });
    })
    .catch((err) => {
      return res.status(500).send('刪除失敗');
    })
})

module.exports = router;
