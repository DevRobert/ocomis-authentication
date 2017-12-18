const Hapi = require('hapi')
const HapiPino = require('hapi-pino')
const Routes = require('./lib/routes')

const server = new Hapi.Server({
    port: 3004
})

const provision = async () => {
    server.route(Routes)

    await server.register(HapiPino)
    await server.start()

    server.logger().info('Ocomis Authentication API Service started.')
    server.logger().info(`Server running at: ${server.info.uri}`)
}

provision().catch((error) => {
    server.logger().error(`Ocomis Authentication API Service start failed: ${error}`)
})

module.exports = server // only for testing
