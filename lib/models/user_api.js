const request = require('request-promise')
const Config = require('config')

const validateUserCredentials = async (username, password) => {
    if (username !== 'test-user' || password !== 'test-password') {
        throw new Error('The entered credentials are invalid.')
    }

    const requestUri = Config.get('apis.user.uri') + '/sessions'
    let response

    try {
        response = await request({
            method: 'POST',
            uri: requestUri,
            body: {
                username,
                password
            },
            json: true
        })
    } catch (error) {
        console.error('Error requesting the User API.')
        console.error(error)

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
