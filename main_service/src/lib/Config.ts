import envSchema from 'env-schema';

const schema = {
  type: 'object',
  required: [ 'HOST', 'PORT', 'DB_URL', 'DB_DEBUG', 'JWT_SECRET', 'CUSTOMER_SERVICE_URL', 'BOOK_SERVICE_URL' ],
  properties: {
    HOST: {
      type: 'string'
    },
    PORT: {
        type: 'number'
      },
    DB_URL: {
        type: 'string'
    },
    DB_DEBUG: {
      type: 'boolean'
    },
    JWT_SECRET: {
      type: 'string'
    },
    CUSTOMER_SERVICE_URL: {
      type: 'string'
    },
    BOOK_SERVICE_URL: {
      type: 'string'
    }
  }
};

envSchema({ schema, dotenv: true });
