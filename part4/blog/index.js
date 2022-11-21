const app = require('./app') // the actual Express application
const http = require('http')
//handling of env variables extracted to config.js
const config = require('./utils/config')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
