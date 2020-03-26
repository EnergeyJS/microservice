const Promise = require('bluebird')
const mongoose = require('mongoose')
const httpStatus = require('http-status')
const APIError = require('../../libs/APIError')

/**
 * User Schema
 */
const OrderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Types.ObjectId
  },
  book: {
    type: mongoose.Types.ObjectId
  },
  quantity: {
    type: Number
  }
},
{
  timestamps: true
}
)

/**
 * Methods
 */
OrderSchema.method({
})

/**
 * Statics
 */
OrderSchema.statics = {
  /**
   * Get User
   * @param {Object} conditions - conditions to find order for
   * @returns {Promise<User, Error>}
   */
  async get (conditions) {
    const order = await this.findOne(conditions).exec()
    if (order) {
      return order
    }
    const err = new APIError('No such order exists!', httpStatus.NOT_FOUND)
    return Promise.reject(err)
  },

  /**
   * List users in decending order of 'createdAt' timestamp
   * @param {number} skip - Number of users to be skipped
   * @param {number} limit - Limit number of users to be returned
   * @returns {Promise<User[], Error>}
   */
  async list ({ page = 1, limit = 50 } = {}) {
    const orders = await this.paginate(
      {},
      {
        page,
        limit
      }
    )
    return orders
  },
  attributes: [
    '_id',
    'customer',
    'book',
    'quantity'
  ]
}

/**
 * @typedef User
 */
module.exports = mongoose.model('User', OrderSchema)
