const Recipe = require('../models/recipe')
const User = require('../models/user')
const JWT_KEY_SECRET = require('../config').JWT_KEY_SECRET;

//authentication libraries
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode')



const showAllRecipes = async (req, res, next) => {
    let isLoggedIn = !!req.cookies.access_token;
    let linkText = isLoggedIn ? "Logout" : "Login/Sign Up";
    let pathText = isLoggedIn ? "logout" : "login";

    try {
    const allRecipes = await Recipe.find();
    res.render("recipelist", {
        allRecipes,
        isLoggedIn,
        linkText,
        pathText,
    });   
    // res.json({
    //     "Recipes Lists": allRecipes,
    //     "status": 200
    // })
    }
    catch (error){
        next(error)
    }
}

//TODO: Deal with log in part here
const getRecipeById = async (req, res, next) =>{
    let isLoggedIn = false 
    let linkText = isLoggedIn ? "Logout" : "Login/Sign Up";
    let pathText = isLoggedIn ? "logout" : "login";
    let userId = null

    const individualRecipe = await Recipe.findById(req.params.id)
    if (req.cookies.access_token) {
        isLoggedIn = true

        linkText = isLoggedIn ? "Logout" : "Login/Sign Up";
        pathText = isLoggedIn ? "logout" : "login";

        const decodedToken = jwt.verify(req.cookies.access_token, JWT_KEY_SECRET)
        userId = decodedToken.userId
    }
    // const showButtons = userId && userId.toString() === story.author.id.toString()
    // res.render("displayrecipe", {individualRecipe, isLoggedIn, userId, linkText, pathText, showButtons})
    res.render("displayrecipe", {individualRecipe, isLoggedIn, linkText, pathText})
}

const createRecipe = async (req, res, next) => {
    const requiredFields = ["title", "equipment", "instructions", "requiredIngredients"];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
        const errorMessage = `missing ${field} in request body`;
        console.error(errorMessage);
        return res.send(errorMessage);
        }
    }

    try {
        const createdRecipe = await Recipe.create(req.body);
        res.redirect("/recipes/display");//change this to show the recipe just created?
    } catch (error) {
        return res.send(error);
    }
}

const deleteRecipeById = async (req, res, next) => {
    try {
    if (Recipe.author.id === userId) {
        await Recipe.findByIdAndDelete({_id: req.params.id})
        console.log("Deleted story");
    } else {
        console.log("cannot do");
    }
    }
    catch (error) {
        next(error)
    }
}

const updateRecipe = async(req, res, next) => {
    try {
        const filter = {_id: req.params.id}
        const newData =  {
            title: req.body.title,
            equipment: req.body.equipment,
            instructions: req.body.instructions,
            requiredIngredients: req.body.requiredIngredients,
            optionalIngredients: req.body.optionalIngredients,
            spices: req.body.spices,
            //image
            difficulty: req.body.difficulty,
            author: req.body.author,
            rating: req.body.rating
        }
        const updatedRecipe = await Recipe.findOneAndUpdate(filter, newData, {new:true})
        res.json({
            "Updated Recipe": updatedRecipe,
            "status": 207
        })
    }
    catch (error) {
        next(error)
    }
}

const sendNewRecipeForm = async(req, res, next) => {
    let isLoggedIn = !! req.cookies.access_token
    //dynamic text to change on DOM based on login status
    let linkText = isLoggedIn ? "Logout" : "Login/Sign Up"
    //more concise syntax instead of "if" tree
    let pathText = isLoggedIn ? "logout" : "login"

    let decodeCookie = jwt_decode(req.cookies.access_token)
    const userId = decodeCookie.userId
    if (!userId) {
        console.log("no cookie found")
        return res.redirect("/users/login")
    }

    try {
        //can be used to find user name using stored Id
        const usr = await User.findById(userId)
        if (!usr) {
            console.log("access denied, user does not exist");
            res.redirect("/users/login")
        } else {
            //checks for cookie, which if present will change isLoggedIn status
            if (req.cookies.access_token) {
                isLoggedIn = true
            }
        }
        res.render("createrecipe", {
            userId, 
            isLoggedIn, 
            linkText, 
            pathText
        })
    }
    catch (error) {
        next (error)
    }
}

module.exports = {
    showAllRecipes,
    getRecipeById,
    createRecipe,
    deleteRecipeById,
    updateRecipe,
    sendNewRecipeForm
}