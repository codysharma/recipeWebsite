const jwt = require('jsonwebtoken')
const {JWT_KEY_SECRET} = require('../config')

const checkAuth = (req, res, next) => {
    try {
        const token = req.cookies.access_token

        if (!token) {
            console.log("no token, must login")
            return res.redirect('/userlogin')
        }

        const decodedToken = jwt.verify(token, JWT_KEY_SECRET)

        req.userId = decodedToken.userId
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = checkAuth