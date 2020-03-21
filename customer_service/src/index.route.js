const express = require('express')
const userRoutes = require('./api/user/user.route')

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
 * @apiDescription Mounts user routes at /users
 * @apiGroup User
 */
router.use('/user', userRoutes)

module.exports = router
