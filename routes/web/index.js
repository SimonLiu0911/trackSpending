const express = require('express');
const shortid = require('shortid');
const moment = require('moment');
const AccountModel = require('../../models/AccountModel');
const { checkLoginMiddleware } = require('../../middleware');

const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/account');
})

router.get('/account', checkLoginMiddleware, (req, res, next) => {
  AccountModel.find().sort({ time: -1 }).exec()
    .then((result) => {
      const accounts = result.map((item) => {
        return {
          ...item._doc,
          time: moment(item._doc.time).format('YYYY-MM-DD')
        }
      })

      res.render('account/account', { accounts });
    })
    .catch((err) => {
      res.status(500).send('讀取失敗~~~')
    })
});

router.get('/account/create', checkLoginMiddleware, (req, res, next) => {
  res.render('account/list');
});

router.post('/account', checkLoginMiddleware, (req, res, next) => {
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

router.get('/account/:id', checkLoginMiddleware, (req, res, next) => {
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
