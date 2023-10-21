//Import bookmark models

function index(req, res){
    let isLoggedIn = false 
    let linkText = isLoggedIn ? "Logout" : "Login/Sign Up";
    let pathText = isLoggedIn ? "logout" : "login";
    if (req.cookies.acces_token) {
        isLoggedIn = true

        const decodedToken = jwt.verify(req.cookies.access_token, JWT_KEY_SECRET)
        userId = decodedToken.userId
    }

    res.render("index", isLoggedIn, pathText, linkText);
}
module.exports = index