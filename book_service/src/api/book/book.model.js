const Promise = require('bluebird')
const mongoose = require('mongoose')
const httpStatus = require('http-status')
const APIError = require('../../libs/APIError')

/**
 * Book Schema
 */
const BookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: mongoose.Types.ObjectId,
  },
  price: {
    type: Number,
    default: 0,
  }
},
{
  timestamps: true
}
)

/**
 * Methods
 */
BookSchema.method({
})

/**
 * Statics
 */
BookSchema.statics = {
  /**
   * Get Book
   * @param {Object} conditions - conditions to find book for
   * @returns {Promise<Book, Error>}
   */
  async get (conditions) {
    const book = await this.findOne(conditions).exec()
    if (book) {
      return book
    }
    const err = new APIError('No such book exists!', httpStatus.NOT_FOUND)
    return Promise.reject(err)
  },

  /**
   * List users in decending order of 'createdAt' timestamp
   * @param {number} skip - Number of users to be skipped
   * @param {number} limit - Limit number of users to be returned
   * @returns {Promise<Book[], Error>}
   */
  async list ({ page = 1, limit = 50 } = {}) {
    console.log(page);
    console.log(limit);
    const books = await this.paginate(
      {},
      {
        page,
        limit
      }
    )
    return books
  },
  attributes: [
    '_id',
    'name',
    'author',
    'price'
  ]
}

/**
 * @typedef Book
 */
module.exports = mongoose.model('Book', BookSchema)
