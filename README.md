# Project
記帳本(trackSpending)

## Project setup
```
npm install
```

## Mongodb start
```
mongod --dbpath /usr/local/var/mongodb --logpath /usr/local/var/log/mongodb/mongo.log --fork
mongo
```

### Compiles and hot-reloads for development
```
npm start
```

## Language
Frontend:
Backend: Node.js, Express
Database: mongodb, mongoose
Other: ejs

## Plugins
ejs: 內簽式模板
md5: 單向數據加密
mongoose: mongoose是一個JavaScript面向對象的編程庫，用於在MongoDB和Node.js JavaScript運行時環境之間創建連接
shortid: 用於生成id
express-session: session機制
connect-mongo: 用來將session儲存到mongodb的中間件

## note
使用 Express 建立基本專案架構，並連結 mongodb 當 Database，html模板使用 ejs
