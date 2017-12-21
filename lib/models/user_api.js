const request = require('request-promise')
const Config = require('config')
const logger = require('../logger')

const validateUserCredentials = async (username, password) => {
    const requestUri = Config.get('apis.user.uri') + '/users/validateCredentials'
    let response

    try {
        response = await request({
            method: 'POST',
            uri: requestUri,
            body: {
                name: username,
                password
            },
            json: true
        })
    } catch (error) {
        logger.error({
            summary: 'Error requesting the User API.',
            details: error.toString()
        })

        if (error.statusCode === 400) {
            throw new Error(error.error.error.message)
        }

        throw new Error('Sorry, an unexpected error occured requesting the User API.')
    }

    return response
}

module.exports = {
    validateUserCredentials
}
