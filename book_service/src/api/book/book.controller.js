const _ = require('lodash')
const httpStatus = require('http-status')

const Book = require('./book.model')
const APIError = require('../../libs/APIError')
const axios = require('axios')
/**
 * Load user and append to req object
 */
async function load (req, res, next, id) {
  try {
    req.user = await Book.get({ '_id': id })
    return next()
  } catch (e) {
    next(e)
  }
}

/**
 * Get user
 * @property {string} req.params.userId _id of user
 * @returns {<Book, Error>}
 */
function get (req, res, next) {
  const user = req.user
  const sendUser = _.pick(user, Book.attributes)
  return res.json(sendUser)
}

/**
 * Create new user
 * @property {string} req.body.username username of user
 * @property {string} req.body.mobileNumber mobileNumber of user
 * @property {string} req.body.password password of user
 * @returns {<Book, Error>}
 */
async function create (req, res, next) {
  try {
    const { name, author, price} = req.body;
    const user = new Book({
      name,
      author,
      price
    })
    const savedUser = await user.save()
    const sendUser = _.pick(savedUser, Book.attributes)
    return res.json(sendUser)
  } catch (e) {
    let err = e
    if (err.code && err.code === 11000) {
      err = new APIError(err.errmsg, httpStatus.BAD_REQUEST, false)
    }
    return next(err)
  }
}

/**
 * Update user
 * @property {string} req.params.userId _id of user
 * @property {string} req.body.mobileNumber mobileNumber of user
 * @returns {<Book, Error>}
 */
async function update (req, res, next) {
  try {
    const user = req.user
    user.mobileNumber = req.body.mobileNumber
    const savedUser = await user.save()
    const sendUser = _.pick(savedUser, ['_id', 'username', 'mobileNumber'])
    return res.json(sendUser)
  } catch (e) {
    next(e)
  }
}

/**
 * List users
 * @property {string} req.params.limit number of users to be listed
 * @property {string} req.params.skip number of users to be skipped
 * @returns {<Book[], Error>}
 */
async function list (req, res, next) {
  try {
    let books = await Book.list(req.query)
    const ids = books.map(book => book.author)
    const {data} = await axios.post('http://localhost:9200/api/user/populate', {ids})
    books = books.map(book => {
      const found = data.find(user=> user._id == book.author)
      found && (book.author = found);
      return book;
    })
    return res.json(books)
  } catch (e) {
    next(e)
  }
}

/**
 * Delete user
 * @property {string} req.params.userId _id of user
 * @returns {<Book, Error>}
 */
async function remove (req, res, next) {
  try {
    const user = req.user
    const deletedUser = await user.remove()
    const sendUser = _.pick(deletedUser, ['_id', 'username', 'mobileNumber'])
    return res.json(sendUser)
  } catch (e) {
    next(e)
  }
}

module.exports = {
  load,
  get,
  create,
  list,
  update,
  remove
}
