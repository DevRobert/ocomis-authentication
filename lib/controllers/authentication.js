const UserApi = require("../models/user_api")
const Token = require("../models/token")

async function login(request, handler) {
    const username = request.payload.username
    const password = request.payload.password
    let user

    try {
        user = await UserApi.validateUserCredentials(username, password)
    }
    catch(error) {
        return handler.response({
            error: {
                message: error.message
            }
        }).code(400)
    }

    const token = Token.generate(user.id, user.name)

    return handler.response({
        token
    })
}

async function refresh(request, handler) {
    throw new Error("Not implemented.")
}

module.exports = {
    login,
    refresh
}