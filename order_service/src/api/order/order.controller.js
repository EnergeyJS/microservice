const _ = require('lodash')
const httpStatus = require('http-status')

const Order = require('./order.model')
const APIError = require('../../libs/APIError')

/**
 * Load order and append to req object
 */
async function load (req, res, next, id) {
  try {
    req.order = await Order.get({ '_id': id })
    return next()
  } catch (e) {
    next(e)
  }
}

/**
 * Get order
 * @property {string} req.params.userId _id of order
 * @returns {<Order, Error>}
 */
function get (req, res, next) {
  const order = req.order
  const sendOrder = _.pick(order, Order.attributes)
  return res.json(sendOrder)
}

/**
 * Create new order
 * @property {string} req.body.username username of order
 * @property {string} req.body.mobileNumber mobileNumber of order
 * @property {string} req.body.password password of order
 * @returns {<Order, Error>}
 */
async function create (req, res, next) {
  try {
    const { book, customer, quantity } = req.body
    const order = new Order({ book, customer, quantity })
    const savedOrder = await order.save()
    const sendOrder = _.pick(savedOrder, Order.attributes)
    return res.json(sendOrder)
  } catch (e) {
    let err = e
    if (err.code && err.code === 11000) {
      err = new APIError(err.errmsg, httpStatus.BAD_REQUEST, false)
    }
    return next(err)
  }
}

/**
 * Update order
 * @property {string} req.params.userId _id of order
 * @property {string} req.body.mobileNumber mobileNumber of order
 * @returns {<Order, Error>}
 */
async function update (req, res, next) {
  try {
    const order = req.order
    const updateOrder = _.pick(req.body, Order.attributes)
    Object.keys(updateOrder).map(key => {
      order[key] = updateOrder[key]
    })
    const savedOrder = await order.save()
    const sendOrder = _.pick(savedOrder, Order.attributes)
    return res.json(sendOrder)
  } catch (e) {
    next(e)
  }
}

/**
 * List users
 * @property {string} req.params.limit number of users to be listed
 * @property {string} req.params.skip number of users to be skipped
 * @returns {<Order[], Error>}
 */
async function list (req, res, next) {
  try {
    const orders = await Order.list(req.query)
    return res.json(orders)
  } catch (e) {
    next(e)
  }
}

/**
 * Delete order
 * @property {string} req.params.userId _id of order
 * @returns {<Order, Error>}
 */
async function remove (req, res, next) {
  try {
    const order = req.order
    const deletedUser = await order.remove()
    const sendOrder = _.pick(deletedUser, Order.attributes)
    return res.json(sendOrder)
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
