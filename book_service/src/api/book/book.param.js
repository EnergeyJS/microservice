const Joi = require('joi')

module.exports = {
  /**
   * @apiName Create Book
   * @apiGroup Book
   */
  create: {
    body: {
      name: Joi.string().required(),
      author: Joi.string().required(),
      price: Joi.number().required(),
    }
  },

  /**
   * @apiName Get Book
   * @apiGroup Book
   */
  get: {
    headers: {
      authorization: Joi.string().required()
    },
    params: {
      bookId: Joi.string().required()
    }
  },

  /**
   * @apiName Update Book
   * @apiGroup Book
   */
  update: {
    headers: {
      authorization: Joi.string().required()
    },
    params: {
      bookId: Joi.string().required()
    },
    body: {
      name: Joi.string().optional(),
      author: Joi.string().optional(),
      price: Joi.number().optional(),
    }
  },

  /**
   * @apiName List Books
   * @apiGroup Book
   */
  list: {
    query: {
      skip: Joi.string(),
      limit: Joi.string()
    }
  },

  /**
   * @apiName Delete Book
   * @apiGroup Book
   */
  remove: {
    headers: {
      authorization: Joi.string().required()
    },
    params: {
      bookId: Joi.string().required()
    }
  }
}
