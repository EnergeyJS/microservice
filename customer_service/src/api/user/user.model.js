const Promise = require('bluebird')
const mongoose = require('mongoose')
const httpStatus = require('http-status')
const APIError = require('../../libs/APIError')

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String
  },
  password: {
    type: String
  }
},
{
  timestamps: true
}
)

/**
 * Methods
 */
UserSchema.method({
})

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Get User
   * @param {Object} conditions - conditions to find user for
   * @returns {Promise<User, Error>}
   */
  async get (conditions) {
    const user = await this.findOne(conditions).exec()
    if (user) {
      return user
    }
    const err = new APIError('No such user exists!', httpStatus.NOT_FOUND)
    return Promise.reject(err)
  },

  /**
   * List users in decending order of 'createdAt' timestamp
   * @param {number} skip - Number of users to be skipped
   * @param {number} limit - Limit number of users to be returned
   * @returns {Promise<User[], Error>}
   */
  async list ({ page = 1, limit = 50 } = {}) {
    const users = await this.paginate(
        {},
        {
          page,
          limit
        }
      )
      return users
    },
  attributes : [
    '_id',
    'email',
    'name',
  ]
}

/**
 * @typedef User
 */
module.exports = mongoose.model('User', UserSchema)
