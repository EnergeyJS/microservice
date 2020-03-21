const express = require('express')
const bookRoutes = require('./api/book/book.route')
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
 * @apiDescription Mounts bokk routes at /book
 * @apiGroup User
 */
router.use('/book', bookRoutes)


module.exports = router
