const Hapi = require('hapi')
const HapiPino = require('hapi-pino')
const Routes = require('./lib/routes')
const logger = require('./lib/logger')

const server = new Hapi.Server({
    port: 3004
})

const provision = async () => {
    server.route(Routes)

    await server.register({
        plugin: HapiPino,
        options: {
            instance: logger
        }
    })

    await server.start()

    logger.info('Ocomis Authentication API Service started.')
    logger.info(`Server running at: ${server.info.uri}`)
}

provision().catch((error) => {
    server.logger().error(`Ocomis Authentication API Service start failed: ${error}`)
    process.exit(1)
})

module.exports = server // only for testing
