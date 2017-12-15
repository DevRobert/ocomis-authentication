const jwt = require('jsonwebtoken')
const config = require('config')

const generate = (userId, userName) => {
    const tokenSecret = config.get('tokenSecret')

    const tokenData = {
        userId,
        userName
    }

    const signOptions = {
        expiresIn: '1h'
    }

    return jwt.sign(tokenData, tokenSecret, signOptions)
}

module.exports = {
    generate
}
