import envSchema from 'env-schema';

const schema = {
  type: 'object',
  required: [ 'HOST', 'PORT', 'DB_URL', 'DB_DEBUG', 'JWT_SECRET', 'BASE_URL' ],
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
    BASE_URL: {
      type: 'string'
    }
  }
};

envSchema({ schema, dotenv: true });
