const mongoose = require('mongoose')
const util = require('util')
const debug = require('debug')('node-rest-starter:index')

const env = require('./environment')

/**
 * make bluebird default Promise
 */
Promise = require('bluebird') // eslint-disable-line no-global-assign

/**
 * plugin bluebird promise in mongoose
 */
mongoose.Promise = require('bluebird')

/**
 * set Username and Password of user
 * enable 'useCreateIndex' for mongoose
 */
const mongoOption = {
  useCreateIndex: true,
  keepAlive: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}

/**
 * connect to mongo db
 */
const mongoUri = `mongodb://${env.mongo.username}:${env.mongo.password}@${env.mongo.host}:${env.mongo.port}/${env.mongo.db}`
mongoose.connect(mongoUri, mongoOption)
mongoose.connection.on('error', () => {
  throw new Error(`Unable to connect to database: ${mongoUri}`)
})

/**
 * print mongoose logs in dev env
 */
if (env.mongo.debug) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc)
  })
}

module.exports = mongoose
