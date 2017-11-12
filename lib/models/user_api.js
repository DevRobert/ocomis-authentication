const validateUserCredentials = async (username, password) => {
    if(username !== "test-user" || password !== "test-password") {
        throw new Error("Invalid credentials.")
    }

    return {
        id: 999,
        name: username
    }
}

module.exports = {
    validateUserCredentials
}