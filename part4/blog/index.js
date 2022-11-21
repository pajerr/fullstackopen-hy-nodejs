const app = require('./app') // the actual Express application
const http = require('http')
//handling of env variables extracted to config.js
const config = require('./utils/config')
//logging module extracted to logger.js
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
