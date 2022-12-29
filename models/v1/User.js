const connectionPool = require('../../configs/database')

//Relationship
const { singleUserReviews } = require('./Review')

const allUsers = (callback) => {
  connectionPool.getConnection((err, pool) => {
    if (err) throw err

    pool.query(
      'SELECT id,username,created_at FROM `tbl_users`',
      [],
      (error, results, fields) => {
        if (error) {
          return callback(error)
        }

        if (results.length > 0) {
          let users = []

          for (let result of results) {
            const val = {
              ...result,
              links: {
                href: `${process.env.APP_PROTOCOL}://${process.env.APP_DOMAIN}:${process.env.APP_PORT}/api/v1/users/${result.id}`,
                rel: 'users',
                type: 'GET',
              },
              relationships: {
                post: {
                  data: [
                    {
                      id: '9',
                      type: 'post',
                    },
                    {
                      id: '15',
                      type: 'post',
                    },
                  ],
                },
                //Get All Reviews
                review: {
                  data: '',
                },
              },
            }

            users.push(val)
          }

          return callback(users, {
            pagination: {
              first: '',
              last: '',
              prev: '',
              next: '',
            },
            meta: {
              copyright: 'Trademark of - .',
              authors: 'Obafunso Ridwan Adebayo',
              year: 2020,
            },
            jsonapi: {
              version: '1.0',
            },
          })
        } else {
          return callback(null)
        }
      }
    )
  })
}

const singleUser = (req, callback) => {
  connectionPool.getConnection((error, pool) => {
    if (error) throw error
    const id = pool.escape(req)

    pool.query(
      'SELECT id,username,created_at FROM `tbl_users` WHERE ?',
      { id: id },
      (error, results, fields) => {
        if (error) {
          callback(error)
        }

        if (results.length > 0) {
          callback(results)
        } else {
          callback(null)
        }
      }
    )
  })
}

module.exports = {
  allUsers,
  singleUser,
}

//pool.escape() or mysql.escape()

// let CURRENT_TIMESTAMP = { toSqlString: function() { return 'CURRENT_TIMESTAMP()'; } };

/** For Images
 * "type": "photos",
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "attributes": {
      "title": "Ember Hamster",
      "src": "http://example.com/images/productivity.png"
 */
