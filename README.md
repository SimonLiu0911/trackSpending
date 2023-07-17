# Project
記帳本(trackSpending)的後端api

## Project setup
```
npm install
```

## Mongodb start
```
mongod --dbpath /usr/local/var/mongodb --logpath /usr/local/var/log/mongodb/mongo.log --fork
mongo
```

## Mongodb finish
```
use admin
db.shutdownServer()
```

### Compiles and hot-reloads for development
```
npm start
```

## Language
Backend: Node.js, Express
Database: mongodb, mongoose
Other: ejs

## Plugins
ejs: 內簽式模板(後僅提供api而不需要)。
md5: 單向數據加密，用來加密客戶的登錄密碼。
mongoose: 一個JavaScript面向對象的編程庫，用於在MongoDB和Node.js JavaScript運行時環境之間創建連接。
shortid: 用於生成id。
express-session: session機制。
connect-mongo: 用來將session儲存到mongodb的中間件。
jsonwebtoken: 用於提供token。
morgan: express 默認日誌 plugin。
cookie-parser: express middleware，用來解析cookie

## note
使用 Express 建立專案架構，並連結 mongodb 當 Database，提供記帳本的 CRUD api
