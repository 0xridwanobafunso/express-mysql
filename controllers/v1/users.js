const { allUsers, singleUser } = require('../../models/v1/User')
/**
 * @description Get All Uses
 * @route /api/v1/users
 * @access Public
 */
exports.getUsers = (req, res, next) => {
  allUsers((data, secondaryData) => {
    if (data) {
      res.status(200).json({
        success: true,
        data: data,
        ...secondaryData,
      })
    } else {
      res.status(404).json({
        error: {
          message: 'Not Found',
          code: 404,
        },
      })
    }
  })
}

/**
 * @description Get Single Uses
 * @route /api/v1/users/:id
 * @access Public
 */
exports.getUser = (req, res, next) => {
  singleUser(req.params.id, (data) => {
    if (data) {
      res.status(200).json({
        success: true,
        data: data,
      })
    } else {
      res.status(404).json({
        error: {
          message: 'Not Found',
          code: 404,
        },
      })
    }
  })
}
