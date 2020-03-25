const express = require('express')
const orderRoutes = require('./api/order/order.route')

const router = express.Router()

/**
 * @api {get} /api Health Check
 * @apiName Health Check
 * @apiGroup API
 * @apiVersion 1.0.0
 *
 * @apiParam none
 *
 * @apiSuccess {String} OK Success Response
 * @apiError {Object} error Error Response
 */
router.get('/', (req, res) => res.send('OK'))

/**
 * @apiDescription Mounts order routes at /order
 * @apiGroup User
 */
router.use('/order', orderRoutes)


module.exports = router
