const AuthenticationController = require("../controllers/authentication")

const Routes = [
    {
        method: "POST",
        path: "/sessions",
        handler: AuthenticationController.login
    },
    {
        method: "DELETE",
        path: "/sessions",
        handler: AuthenticationController.logout
    },
    {
        method: "PUT",
        path: "/sessions",
        handler: AuthenticationController.refresh
    }
]

module.exports = Routes