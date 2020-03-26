const { Router } = require('express')
const validate = require('express-validation')

const bookParam = require('./book.param')
const bookCtrl = require('./book.controller')

const router = Router()

router.route('/populate')
  /**
   * @api {get} /api/book List Books
   * @apiName List Books
   * @apiGroup Book
   * @apiVersion 1.0.0
   *
   * @apiParam none
   *
   * @apiSuccess {Array} book List of book
   * @apiError {Object} error Error response
   */
  .post(validate(bookParam.list), bookCtrl.populate)

router.route('/')
  /**
   * @api {get} /api/book List Books
   * @apiName List Books
   * @apiGroup Book
   * @apiVersion 1.0.0
   *
   * @apiParam none
   *
   * @apiSuccess {Array} book List of book
   * @apiError {Object} error Error response
   */
  .get(validate(bookParam.list), bookCtrl.list)

  /**
   * @api {post} /api/book Create Book
   * @apiName Create Book
   * @apiGroup Book
   * @apiVersion 1.0.0
   *
   * @apiParam (body) {String} username Username of user
   * @apiParam (body) {String} mobileNumber Mobile number of user
   * @apiParam (body) {String} password Password of user
   *
   * @apiSuccess {Object} book List of book
   * @apiError {Object} error Error response
   */
  .post(validate(bookParam.create), bookCtrl.create)

router.route('/:bookId')
  /**
   * @api {get} /api/book/:bookId Get Book
   * @apiName Get Book
   * @apiGroup Book
   * @apiVersion 1.0.0
   *
   * @apiParam (param) {String} bookId _id of user
   *
   * @apiSuccess {Object} user Details of user
   * @apiError {Object} error Error response
   */
  .get(
    validate(bookParam.get),
    bookCtrl.get
  )

  /**
   * @api {put} /api/book/:bookId Update Book
   * @apiName Update Book
   * @apiGroup Book
   * @apiVersion 1.0.0
   *
   * @apiParam (param) {String} bookId _id of user
   * @apiParam (body) {String} mobileNumber Mobile number of user
   *
   * @apiSuccess {Object} book List of book
   * @apiError {Object} error Error response
   */
  .put(
    validate(bookParam.update),
    bookCtrl.update)

  /**
   * @api {delete} /api/book/:bookId Delete Book
   * @apiName Delete Book
   * @apiGroup Book
   * @apiVersion 1.0.0
   *
   * @apiParam (param) {String} bookId _id of user
   *
   * @apiSuccess {Object} user Deleted user details
   * @apiError {Object} error Error response
   */
  .delete(
    validate(bookParam.remove),
    bookCtrl.remove)

/**
 * Load user when API is hit with bookId param
 */
router.param('bookId', bookCtrl.load)

module.exports = router
