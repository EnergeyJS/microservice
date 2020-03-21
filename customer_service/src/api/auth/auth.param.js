const Joi = require('joi')

module.exports = {
  /**
   * @apiName User Login
   * @apiGroup Auth
   */
  login: {
    email: Joi.string().required(),
    password: Joi.string().required()
  }
}
