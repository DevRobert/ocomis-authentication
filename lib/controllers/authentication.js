const UserApi = require('../models/user_api')
const Token = require('../models/token')
const boom = require('boom')

async function login (request, h) {
    const username = request.payload.username
    const password = request.payload.password

    if (!username) {
        throw boom.badRequest('The username was not specified.')
    }

    if (!password) {
        throw boom.badRequest('The password was not specified.')
    }

    let user

    try {
        user = await UserApi.validateUserCredentials(username, password)
    } catch (error) {
        throw boom.badRequest(error.message)
    }

    const token = Token.generate(user.id, user.name)

    return h.response({
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
