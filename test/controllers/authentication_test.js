const lab = exports.lab = require('lab').script()
const { beforeEach, afterEach, describe, it } = lab
const { expect } = require('code')
const Server = require('../../')
const UserApi = require('../../lib/models/user_api')
const Sinon = require('sinon')

describe('AuthenticationController', () => {
    const validUsername = 'test-username'
    const validPassword = 'test-password'
    const validUserId = 1000
    const invalidCredentialsMessage = 'Testing: Invalid credentials'

    beforeEach(() => {
        const stub = Sinon.stub(UserApi, 'validateUserCredentials')

        stub.callsFake(async (username, password) => {
            if (username === validUsername && password === validPassword) {
                return {
                    id: validUserId,
                    name: validUsername
                }
            }

            throw new Error(invalidCredentialsMessage)
        })
    })

    afterEach(() => {
        UserApi.validateUserCredentials.restore()
    })

    describe('POST /authentication/api/sessions', () => {
        describe('if a valid username and password is given', () => {
            it('should issue a JWT token', async () => {
                // Act

                const response = await Server.inject({
                    method: 'POST',
                    url: '/authentication/api/sessions',
                    payload: {
                        username: validUsername,
                        password: validPassword
                    }
                })

                // Assert

                expect(response.statusCode).equals(200)
                expect(response.result).instanceOf(Object)
                expect(response.result.token).not.to.be.empty()
            })
        })

        describe('if no username is given', () => {
            it('should return an error', async () => {
                // Act

                const response = await Server.inject({
                    method: 'POST',
                    url: '/authentication/api/sessions',
                    payload: {
                        password: validPassword
                    }
                })

                // Assert

                expect(response.statusCode).equals(400)
                expect(response.result).instanceOf(Object)
                expect(response.result.error).instanceOf(Object)
                expect(response.result.error.message).equals('The username was not specified.')
            })
        })

        describe('if no password is given', () => {
            it('should return an error', async () => {
                // Act

                const response = await Server.inject({
                    method: 'POST',
                    url: '/authentication/api/sessions',
                    payload: {
                        username: validUsername
                    }
                })

                // Assert

                expect(response.statusCode).equals(400)
                expect(response.result).instanceOf(Object)
                expect(response.result.error).instanceOf(Object)
                expect(response.result.error.message).equals('The password was not specified.')
            })
        })

        describe('if invalid credentials are given', () => {
            it('should return the error message of the authentication api', async () => {
                // Act

                const response = await Server.inject({
                    method: 'POST',
                    url: '/authentication/api/sessions',
                    payload: {
                        username: 'invalid-username',
                        password: 'invalid-password'
                    }
                })

                // Assert

                expect(response.statusCode).equals(400)
                expect(response.result).instanceOf(Object)
                expect(response.result.error).instanceOf(Object)
                expect(response.result.error.message).equals(invalidCredentialsMessage)
            })
        })
    })

    describe('PUT /authentication/api/sessions', () => {
        // todo not implemented
    })
})
