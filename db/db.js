/**
 * @param {*} success 數據庫連結成功的回調
 * @param {*} error 數據庫連結失敗的回調
 */
module.exports = function (success, error) {
  if (typeof error !== 'function') error = () => console.log('連接失敗');

  const mongoose = require('mongoose');
  const { DBHOST, DBPORT, DBNAME } = require('../config/config');

  mongoose.set('strictQuery', true);

  // 連結 mongodb 服務
  mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);

  // 設置連結成功的回調
  mongoose.connection.once('open', () => {
    success();
  });

  // 設置連結錯誤的回調
  mongoose.connection.on('error', () => {
    error();
  })
  // 設置連結關閉的回調
  mongoose.connection.on('close', () => {
    console.log('close');
  })
}