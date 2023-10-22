const User = require('../models/user')
const JWT_KEY_SECRET = require('../config').JWT_KEY_SECRET;


//authentication libraries
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

//---------------functions for routes
const showAllUsers = async (req, res, next) => {
    let isLoggedIn = !!req.cookies.access_token;
    let linkText = isLoggedIn ? "Logout" : "Login/Sign Up";
    let pathText = isLoggedIn ? "logout" : "login";

    try {
    const allUsers = await User.find()
    if(req.cookies.acces_token) {
        isLoggedIn = true
    }
    res.render("userlist", {allUsers, isLoggedIn, linkText, pathText})
    // res.json({
    //     "All Users": allUsers,
    //     "status": 210
    // })
    }
    catch (error){
        next(error)
    }
}

const getUserById = async (req, res, next) =>{
    let isLoggedIn = !!req.cookies.access_token;
    let linkText = isLoggedIn ? "Logout" : "Login/Sign Up";
    let pathText = isLoggedIn ? "logout" : "login";

    try {
    const individualUser = await User.findById(req.params.id)
    if(req.cookies.access_token) {
        isLoggedIn = true
    }
    res.render("displayuser", {individualUser, isLoggedIn, linkText, pathText})
    }
    catch (error) {
        next(error)
    }
    // res.json({
    //     "User Info": individualUser,
    //     "status": 214
    // })
}

//new user form
const sendNewUserForm = async (req, res, next) => {
    let isLoggedIn = !!req.cookies.acces_token
    let linkText = isLoggedIn ? "Logout" : "Login/Sign Up"
    //more concise syntax instead of "if" tree
    let pathText = isLoggedIn ? "Logout" : "Login"
    res.render("signup", {isLoggedIn, linkText, pathText})
}

//Create new user
const createUser = async (req, res, next) => {
    //loops through each piece of info in requiredFields to check for empty field
    const requiredFields = ["name", "email", "password"]
    console.log("req.body ", req.body);

    for (let field of requiredFields) {
        if (!(field in req.body)) {
            const errorMessage = `Missing ${field} in request body`
            console.error(errorMessage)
            return res.send(errorMessage)
        }
    }

    req.body.email = req.body.email.toLowerCase()
    //set all 3 input fields to one object after we normalize the email
    const {name, email, password} = req.body
    
    try {
        //Hash the password with bcryptjs, salting 12 times
        const encryptedPassword = await bcrypt.hash(password, 12)
        const newUser = {name, email, password: encryptedPassword}

        //post newUser to to database
        const usr = await User.create(newUser)

        const token = jwt.sign(
            {userId: usr.id, email: usr.email},
            JWT_KEY_SECRET,
            {expiresIn: '5hr'}
        )

        //log user in and redirect them to general page. 
        return res.cookie("access_token", token).redirect("/recipes/display")
    }
    catch (error){
        next(error)
    }
}
//how will this change after using bcrypt?
const deleteUserById = async (req, res, next) => {
    try {
    await User.findByIdAndDelete({_id: req.params.id})
    res.json({
        "message": "User successfully deleted"
    })
    }
    catch (error){
        next(error)
    }
}
//how will this change after using bcrypt?
const updateUser =  async(req,res, next) => {
    try {
        const filter = {_id: req.params.id}
        const newData = {
            name: req.body.name,
            email: req.body.email,
            // password: req.body.password,
            recipesLiked: req.body.recipesLiked
            }
        const updatedUser = await User.findOneAndUpdate(filter, newData, {new:true})
        // res.json({
        //     "Updated Recipe": updatedUser,
        //     "status": 212
        // })
    }
    catch (error) {
        next(error)
    }
}

const sendLogInForm = async(req, res, next) => {
    let isLoggedIn = !!req.cookies.access_token;
    let linkText = isLoggedIn ? "Logout" : "Login/Sign Up";
    let pathText = isLoggedIn ? "logout" : "login";

    if(req.cookies.access_token) {
        isLoggedIn = true
    } 
    res.render('login', {isLoggedIn, linkText, pathText})
}

const logIn = async(req, res, next) => {
    try {
        req.body.email.toLowerCase()

        //check if email exists in database
        const usr = await User.findOne({email: req.body.email})
        if (!usr) {
            return res.send("email not found")
        }
        //check password if it matches database collection with that email
        const match = await bcrypt.compare(req.body.password, usr.password)
        if (match === false) {
            return res.send("Email and password do not match")
        }

        //give cookie
        const token = jwt.sign(
            {userId: usr.id, email: usr.email},
            JWT_KEY_SECRET,
            {expiresIn: '5hr'}
        )
        return res.cookie("access_token", token).redirect('/recipes/display')
    } catch (error) {
        next(error)
    }
}

const logOut = async (req, res, next) => {
    const token = req.cookies.acces_token
    console.log(token);
    // if (!token) {
    //     return res.send("Failed to logout due to token issue")
    // }
    // const data = jwt.verify(token, JWT_KEY_SECRET)

    return res.clearCookie("access_token").redirect('/users/login')
}

module.exports = {
    showAllUsers,
    getUserById,
    sendNewUserForm,
    createUser,
    deleteUserById,
    updateUser,
    sendLogInForm,
    logIn,
    logOut
}