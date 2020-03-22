const _ = require('lodash')
const httpStatus = require('http-status')

const Book = require('./book.model')
const APIError = require('../../libs/APIError')
/**
 * Load book and append to req object
 */
async function load (req, res, next, id) {
  try {
    req.book = await Book.get({ '_id': id })
    return next()
  } catch (e) {
    next(e)
  }
}

/**
 * Get book
 * @property {string} req.params.userId _id of book
 * @returns {<Book, Error>}
 */
function get (req, res, next) {
  const book = req.book
  const sendUser = _.pick(book, Book.attributes)
  return res.json(sendUser)
}

/**
 * Create new book
 * @property {string} req.body.username username of book
 * @property {string} req.body.mobileNumber mobileNumber of book
 * @property {string} req.body.password password of book
 * @returns {<Book, Error>}
 */
async function create (req, res, next) {
  try {
    const { name, author, price} = req.body;
    const book = new Book({
      name,
      author,
      price
    })
    const savedBook = await book.save()
    const sendUser = _.pick(savedBook, Book.attributes)
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
 * Update book
 * @property {string} req.params.userId _id of book
 * @property {string} req.body.mobileNumber mobileNumber of book
 * @returns {<Book, Error>}
 */
async function update (req, res, next) {
  try {
    const book = req.book
    const updateBook = _.pick(req.body, Book.attributes)
    Object.keys(updateBook).map(key => {
      book[key] = updateBook[key]
    })

    const savedBook = await book.save()
    const sendUser = _.pick(savedBook, Book.attributes)
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
    return res.json(books)
  } catch (e) {
    next(e)
  }
}

/**
 * Delete book
 * @property {string} req.params.userId _id of book
 * @returns {<Book, Error>}
 */
async function remove (req, res, next) {
  try {
    const book = req.book
    const deletedUser = await book.remove()
    const sendUser = _.pick(deletedUser, Book.attributes)
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
