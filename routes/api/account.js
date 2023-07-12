const express = require('express');
const moment = require('moment');
const shortid = require('shortid');
const AccountModel = require('../../models/AccountModel');

const router = express.Router();

// 獲取帳單列表
router.get('/account', (req, res, next) => {
  AccountModel.find().sort({ time: -1 }).exec()
    .then((result) => {
      res.json({
        code: '0',
        msg: 'success',
        data: result
      })
    })
    .catch((err) => {
      res.json({
        code: '1',
        msg: 'fail',
      })
    })
});

// 獲取單個帳單
router.get('/account/:id', (req, res, next) => {
  const { id } = req.params;

  AccountModel.findById(id)
    .then((result) => {
      res.json({
        code: '0',
        msg: 'success',
        data: result
      })
    }).catch((err) => {
      res.json({
        code: '1',
        msg: 'fail'
      })
    })
})

// 更新帳單
router.patch('/account/:id', (req, res, next) => {
  const { id } = req.params;

  AccountModel.updateOne({ _id: id }, req.body)
    .then((result) => {
      AccountModel.findById(id)
      .then((data) => {
        res.json({
          code: '0',
          msg: 'success',
          data
        })
      })
    })
    .catch((err) => {
      res.json({
        code: '1',
        msg: 'fail'
      })
    })
})

// 新增數據
router.post('/account', (req, res, next) => {
  const data = {
    ...req.body,
    time: moment(req.body.time).toDate()
  };

  AccountModel.create(data)
    .then((result) => {
      res.json({
        code: '0',
        msg: 'success',
        data: result
      })
    })
    .catch((err) => {
      res.json({
        code: '1',
        msg: 'fail'
      })
    })
});

// 刪除紀錄
router.delete('/account/:id', (req, res, next) => {
  const { id } = req.params;

  AccountModel.deleteOne({ _id: id })
    .then((result) => {
      res.json({
        code: '0',
        msg: 'success',
        data: result
      })
    })
    .catch((err) => {
      res.json({
        code: '1',
        msg: 'fail'
      })
    })
})

module.exports = router;
