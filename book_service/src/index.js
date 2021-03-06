/**
 * Wrap all console logs with consola
 */
const consola = require('consola')
consola.wrapAll()

const mongoose = require('./config/mongoose')
const app = require('./config/express')
const env = require('./config/environment')

/**
 * Start application if not running test
 */
if (env.nodeEnv !== 'test') {
  mongoose.connection.on('connected', () => {
    consola.ready({
      message: 'MongoDB',
      badge: true
    })
    app.listen(env.port, () => {
      consola.ready({
        message: `${env.appName} Server`,
        badge: true
      })
      consola.log('-------------------------------------------------')
      consola.info(`Environment: ${env.nodeEnv}`)
      consola.info(`Port: ${env.port}`)
      consola.info(`Base uri: http://localhost:${env.port}/api`)
      consola.info(`Mongo uri: mongodb://${env.mongo.username}:${env.mongo.password}@${env.mongo.host}:${env.mongo.port}/${env.mongo.db}`)
    })
  })
}

module.exports = app
