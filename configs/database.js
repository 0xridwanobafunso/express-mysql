const mysql = require('mysql')
const dotenv = require('dotenv')
// const fs = require('fs')

dotenv.config({ path: './.env' })

const connectionPool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: process.env.DB_CONNLIMIT,
  //   ssl: {
  //     ca: fs.readFileSync(__dirname + '/mysql-ca.crt'),
  //   },
})

module.exports = connectionPool
