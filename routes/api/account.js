const express = require('express');
const moment = require('moment');
const shortid = require('shortid');
const AccountModel = require('../../models/AccountModel');
const { checkTokenMiddleware } = require('../../middleware');

const router = express.Router();

// get account list
router.get('/account', checkTokenMiddleware, (req, res, next) => {
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

// get single account
router.get('/account/:id', checkTokenMiddleware,(req, res, next) => {
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

// update account
router.patch('/account/:id', checkTokenMiddleware, (req, res, next) => {
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

// create account
router.post('/account', checkTokenMiddleware, (req, res, next) => {
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

// delete account
router.delete('/account/:id', checkTokenMiddleware, (req, res, next) => {
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
