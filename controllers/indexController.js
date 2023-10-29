//Import bookmark models
const Recipe = require('../models/recipe')

const index = async (req, res, next) => {
    let isLoggedIn = false 
    let linkText = isLoggedIn ? "Logout" : "Login/Sign Up";
    let pathText = isLoggedIn ? "logout" : "login";
    if (req.cookies.acces_token) {
        isLoggedIn = true

        const decodedToken = jwt.verify(req.cookies.access_token, JWT_KEY_SECRET)
        userId = decodedToken.userId
    }
    count = await Recipe.count({})
    random = Math.floor(Math.random() * count)
    list = await Recipe.find() 
    randomRecipe = list[random]
    try {
        res.render("index", { isLoggedIn, pathText, linkText, randomRecipe });
    } catch (error) {
        next(error)
    }
}
module.exports = index