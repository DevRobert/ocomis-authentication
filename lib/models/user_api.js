const validateUserCredentials = async (username, password) => {
    if(!username) {
        throw new Error("Please enter your username.")
    }

    if(!password) {
        throw new Error("Please enter your password.")
    }

    if(username !== "test-user" || password !== "test-password") {
        throw new Error("The entered credentials are invalid.")
    }

    return {
        id: 999,
        name: username
    }
}

module.exports = {
    validateUserCredentials
}