const Hapi = require("hapi")
const Routes = require("./lib/routes")

const server = new Hapi.Server({
    port: 3001
})

const provision = async () => {
    server.route(Routes)

    server.events.on("log", (event, tags) => {
        console.log(event)
    })

    await server.start()
}

provision().then(() => {
    console.log("Ocomis authentication service started.")
    console.log("Server running at: " + server.info.uri)
}).catch((error) => {
    console.error(error)
})