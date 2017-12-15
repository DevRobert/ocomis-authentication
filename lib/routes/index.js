const AuthenticationController = require('../controllers/authentication')

const Routes = [
    {
        method: 'POST',
        path: '/authentication/api/sessions',
        handler: AuthenticationController.login,
        config: {

        }
    },
    {
        method: 'PUT',
        path: '/authentication/api/sessions',
        handler: AuthenticationController.refresh
    }
]

module.exports = Routes
