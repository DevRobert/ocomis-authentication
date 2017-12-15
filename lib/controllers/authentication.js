const UserApi = require('../models/user_api')
const Token = require('../models/token')

async function login (request, handler) {
    const username = request.payload.username
    const password = request.payload.password

    if (!username) {
        return handler.response({
            error: {
                message: 'The username was not specified.'
            }
        }).code(400)
    }

    if (!password) {
        return handler.response({
            error: {
                message: 'The password was not specified.'
            }
        }).code(400)
    }

    let user

    try {
        user = await UserApi.validateUserCredentials(username, password)
    } catch (error) {
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

async function refresh (request, handler) {
    throw new Error('Not implemented.')
}

module.exports = {
    login,
    refresh
}
