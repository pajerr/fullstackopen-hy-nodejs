const app = require('./app') // the actual Express application
const http = require('http')

const server = http.createServer(app)

server.listen(process.env.PORT || 3003, () => {
  console.log(`Server running on port ${process.env.PORT || 3003}`)
})
