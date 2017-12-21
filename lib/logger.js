const pino = require('pino')

const logger = pino().child({
    service: 'ocomis-authentication-api'
})

module.exports = logger
