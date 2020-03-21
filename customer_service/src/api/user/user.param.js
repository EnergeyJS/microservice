const Joi = require('joi')

module.exports = {
  /**
   * @apiName Create User
   * @apiGroup User
   */
  create: {
    body: {
      email: Joi.string().required(),
      name: Joi.string().required(),
      password: Joi.string().required()
    }
  },

  /**
   * @apiName Get User
   * @apiGroup User
   */
  get: {
    params: {
      userId: Joi.string().required()
    }
  },

  /**
   * @apiName Update User
   * @apiGroup User
   */
  update: {
    params: {
      userId: Joi.string().required()
    },
    body: {
      email: Joi.string().required()
    }
  },

  /**
   * @apiName List Users
   * @apiGroup User
   */
  list: {
    query: {
      skip: Joi.string(),
      limit: Joi.string()
    }
  },

  /**
   * @apiName Delete User
   * @apiGroup User
   */
  remove: {
    params: {
      userId: Joi.string().required()
    }
  }
}
