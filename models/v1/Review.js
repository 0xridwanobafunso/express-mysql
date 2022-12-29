const connectionPool = require('../../configs/database')

const singleUserReviews = (id, callback) => {
  connectionPool.getConnection((err, pool) => {
    if (err) throw err

    pool.query(
      'SELECT * FROM `tbl_reviews` WHERE ?',
      { user_id: id },
      (error, results, fields) => {
        if (error) {
          return callback(error)
        }

        if (results.length > 0) {
          return callback(results)
        } else {
          return callback(null)
        }
      }
    )
  })
}

module.exports = {
  singleUserReviews,
}
