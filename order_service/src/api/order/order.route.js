const { Router } = require('express')

const userCtrl = require('./order.controller')

const router = Router()

router.route('/book/:bookId')
  /**
   * @api {get} /api/orders List Orders
   * @apiName List Orders
   * @apiGroup Order
   * @apiVersion 1.0.0
   *
   * @apiParam none
   *
   * @apiSuccess {Array} orders List of orders
   * @apiError {Object} error Error response
   */
  .get(userCtrl.ordersByBook)

router.route('/author/:authorId')
  /**
   * @api {get} /api/orders List Orders
   * @apiName List Orders
   * @apiGroup Order
   * @apiVersion 1.0.0
   *
   * @apiParam none
   *
   * @apiSuccess {Array} orders List of orders
   * @apiError {Object} error Error response
   */
  .post(userCtrl.ordersByAuthor)

router.route('/customer/:customerId')
  /**
   * @api {get} /api/orders List Orders
   * @apiName List Orders
   * @apiGroup Order
   * @apiVersion 1.0.0
   *
   * @apiParam none
   *
   * @apiSuccess {Array} orders List of orders
   * @apiError {Object} error Error response
   */
  .get(userCtrl.ordersByCustomer)
router.route('/')
  /**
   * @api {get} /api/orders List Orders
   * @apiName List Orders
   * @apiGroup Order
   * @apiVersion 1.0.0
   *
   * @apiParam none
   *
   * @apiSuccess {Array} orders List of orders
   * @apiError {Object} error Error response
   */
  .get(userCtrl.list)

  /**
   * @api {post} /api/orders Create Order
   * @apiName Create Order
   * @apiGroup Order
   * @apiVersion 1.0.0
   *
   * @apiParam (body) {String} customer Customer id of the order
   * @apiParam (body) {String} book Book id number of order
   * @apiParam (body) {String} quantity Quantity of order
   *
   * @apiSuccess {Object} orders List of orders
   * @apiError {Object} error Error response
   */
  .post(userCtrl.create)

router.route('/:orderId')
  /**
   * @api {get} /api/orders/:orderId Get Order
   * @apiName Get Order
   * @apiGroup Order
   * @apiVersion 1.0.0
   *
   * @apiParam (param) {String} orderId _id of user
   *
   * @apiSuccess {Object} user Details of user
   * @apiError {Object} error Error response
   */
  .get(userCtrl.get)

  /**
   * @api {put} /api/orders/:orderId Update Order
   * @apiName Update Order
   * @apiGroup Order
   * @apiVersion 1.0.0
   *
   * @apiParam (param) {String} orderId _id of order
   * @apiParam (body) {String} customer Customer id of the order
   * @apiParam (body) {String} book Book id number of order
   * @apiParam (body) {String} quantity Quantity of order
   *
   * @apiSuccess {Object} orders List of orders
   * @apiError {Object} error Error response
   */
  .put(userCtrl.update)

  /**
   * @api {delete} /api/orders/:orderId Delete Order
   * @apiName Delete Order
   * @apiGroup Order
   * @apiVersion 1.0.0
   *
   * @apiParam (param) {String} orderId _id of user
   *
   * @apiSuccess {Object} user Deleted user details
   * @apiError {Object} error Error response
   */
  .delete(userCtrl.remove)

/**
 * Load user when API is hit with orderId param
 */
router.param('orderId', userCtrl.load)

module.exports = router
