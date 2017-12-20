const Hapi = require('hapi')
const pino = require('pino')
const HapiPino = require('hapi-pino')
const Routes = require('./lib/routes')

const server = new Hapi.Server({
    port: 3004
})

const provision = async () => {
    server.route(Routes)

    const logger = pino().child({
        service: 'ocomis-authentication-api'
    })

    await server.register({
        plugin: HapiPino,
        options: {
            instance: logger
        }
    })

    await server.start()

    server.logger().info('Ocomis Authentication API Service started.')
    server.logger().info(`Server running at: ${server.info.uri}`)
}

provision().catch((error) => {
    server.logger().error(`Ocomis Authentication API Service start failed: ${error}`)
    process.exit(1)
})

module.exports = server // only for testing
