const bcrypt = require('bcryptjs')
const httpStatus = require('http-status')

const JWToken = require('../../libs/jwToken')
const APIError = require('../../libs/APIError')
const User = require('../user/user.model')

/**
 * Returns jwt token if valid useranme and password is provided
 * @property {string} req.body.username username of user
 * @property {string} req.body.password password of user
 * @returns {<{token, user}, Error>}
 */
async function login (req, res, next) {
  try {
    const user = await User.get({ email: req.body.email })
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const payload = {
        email: user.email,
        name: user.name
      }
      const token = JWToken.create(payload, '20m')
      return res.json({
        token,
        user: {
          _id: user._id,
          email: user.email,
          name: user.name
        }
      })
    }
    throw new APIError('Authentication error!', httpStatus.UNAUTHORIZED, true)
  } catch (e) {
    next(e)
  }
}

module.exports = {
  login
}
