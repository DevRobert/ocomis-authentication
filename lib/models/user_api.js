const validateUserCredentials = async (username, password) => {
    if (username !== 'test-user' || password !== 'test-password') {
        throw new Error('The entered credentials are invalid.')
    }

    return {
        id: 999,
        name: username
    }
}

module.exports = {
    validateUserCredentials
}
