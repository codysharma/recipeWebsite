const mongoose = require('mongoose');
const Recipe = require('../models/recipe')
const User = require('../models/user')
const {JWT_KEY_SECRET} = require('../config');

//authentication libraries
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode')

//------Route functions
const showAllRecipes = async (req, res, next) => {
    let isLoggedIn = !!req.cookies.access_token;
    let linkText = isLoggedIn ? "Logout" : "Login/Sign Up";
    let pathText = isLoggedIn ? "logout" : "login";

    // let decodeCookie = jwt_decode(req.cookies.access_token)
    // const userId = decodeCookie.userId
    // const loggedInUser = await User.findById(userId)

    try {
    const allRecipes = await Recipe.find();
    const allUsers = await User.find()
    res.render("recipelist", {
        allRecipes,
        allUsers,
        isLoggedIn,
        linkText,
        pathText,
    });   
    }
    catch (error){
        next(error)
    }
}

const getRecipeById = async (req, res, next) => {
    let isLoggedIn = false;
    let linkText = "Login/Sign Up";
    let pathText = "login";
    let userId = null;

    if (req.cookies.access_token) {
        try {
            const decodedToken = jwt.verify(req.cookies.access_token, JWT_KEY_SECRET);
            userId = decodedToken.userId;
            isLoggedIn = true;
            linkText = "Logout";
            pathText = "logout";
        } catch (error) {
            // Handle token verification error, if any
            console.error(error);
        }
    }

    try {
        const individualRecipe = await Recipe.findById(req.params.id);

        if (!individualRecipe.author) {
            // Handle case where the author property is undefined
            let author = "None listed"

            res.render('displayrecipe', { individualRecipe, isLoggedIn, linkText, pathText, userId, isAuthor: false, author });
            return;
        }
        const authorIdString = individualRecipe.author.toString();
        const isAuthor = userId === authorIdString;
        authorObj = await User.findById(authorIdString)
        let author = authorObj.name

        //testing the like button setup
        console.log(individualRecipe.id);
        console.log(await User.findById(userId));

        res.render('displayrecipe', { individualRecipe, isLoggedIn, linkText, pathText, userId, isAuthor, author });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


//How would I create a nested function for separating the array items?
const createRecipe = async (req, res, next) => {
    const requiredFields = ["title", "equipment", "instructions", "requiredIngredients"]
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i]
        if (!(field in req.body)) {
        const errorMessage = `missing ${field} in request body`
        console.error(errorMessage)
        return res.send(errorMessage)
        }
    }
    try {
        const instructions = req.body.instructions
        const instructionsList = instructions.split('.')
        if (instructionsList[instructionsList.length] === "" || instructionsList[instructionsList.length] === " " || instructionsList[instructionsList.length] === undefined) {
            instructionsList.pop()
        }
        req.body.instructions = instructionsList

        const equipment = req.body.equipment
        const equipmentList = equipment.split(',')
        if (equipmentList[equipmentList.length] === "" || equipmentList[equipmentList.length] === " " || equipmentList[equipmentList.length] === undefined) {
            equipmentList.pop()
        }
        req.body.equipment = equipmentList

        const requiredIngredients = req.body.requiredIngredients
        const requiredIngredientsList = requiredIngredients.split(',')
        if (requiredIngredientsList[requiredIngredientsList.length] === "" || requiredIngredientsList[requiredIngredientsList.length] === " " || requiredIngredientsList[requiredIngredientsList.length] === undefined) {
            requiredIngredientsList.pop()
        }
        req.body.requiredIngredients = requiredIngredientsList

        const optionalIngredients = req.body.optionalIngredients
        const optionalIngredientsList = optionalIngredients.split(',')
        if (optionalIngredientsList[optionalIngredientsList.length] === "" || optionalIngredientsList[optionalIngredientsList.length] === " " || optionalIngredientsList[optionalIngredientsList.length] === undefined) {
            optionalIngredientsList.pop()
        }
        req.body.optionalIngredients = optionalIngredientsList

        const spices = req.body.spices
        const spicesList = spices.split(',')
        if (spicesList[spicesList.length] === "" || spicesList[spicesList.length] === " " || spicesList[spicesList.length] === undefined) {
            spicesList.pop()
        }
        req.body.spices = spicesList

        // separate(req.body)

        const createdRecipe = await Recipe.create(req.body)
        res.redirect(`/recipes/display`)
    } catch (error) {
        return res.send(error);
    }
}
        
const deleteRecipeById = async (req, res, next) => {
    try {
        await Recipe.findByIdAndDelete({_id: req.params.id})
    }
    catch (error) {
        next(error)
    }
    res.redirect("display")
}

const updateRecipe = async (req, res, next) => {
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
        const filter = { _id: req.params.id };

        // Exclude author field from newData object
        const newData = {
            title: req.body.title,
            equipment: req.body.equipment,
            instructions: req.body.instructions,
            requiredIngredients: req.body.requiredIngredients,
            // ... other fields ...
            // Exclude author field to prevent modification
        };

        const updatedRecipe = await Recipe.findOneAndUpdate(filter, newData, { new: true });
        res.redirect("/recipes/display"); // Change this to the appropriate redirect URL
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
};

const sendEditRecipeForm = async(req, res, next) => {
    let isLoggedIn = !! req.cookies.access_token
    //dynamic text to change on DOM based on login status
    let linkText = isLoggedIn ? "Logout" : "Login/Sign Up"
    //more concise syntax instead of "if" tree
    let pathText = isLoggedIn ? "logout" : "login"

    if (!req.cookies.access_token) {
        console.log("no cookie found")
        return res.redirect("/users/login")
    } else {
        isLoggedIn = true
    }

    let decodeCookie = jwt_decode(req.cookies.access_token)
    const userId = decodeCookie.userId

    const individualRecipe = await Recipe.findById(req.params.id)

    try {
        res.render("editrecipe", {
            userId,
            individualRecipe, 
            isLoggedIn, 
            linkText, 
            pathText
        })
    }
    catch (error) {
        next (error)
    }
}

const sendNewRecipeForm = async(req, res, next) => {
    let isLoggedIn = !! req.cookies.access_token
    //dynamic text to change on DOM based on login status
    let linkText = isLoggedIn ? "Logout" : "Login/Sign Up"
    //more concise syntax instead of "if" tree
    let pathText = isLoggedIn ? "logout" : "login"

    if (!req.cookies.access_token) {
        console.log("no cookie found")
        return res.redirect("/users/login")
    }

    let decodeCookie = jwt_decode(req.cookies.access_token)
    const userId = decodeCookie.userId
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
            usr, 
            isLoggedIn, 
            linkText, 
            pathText
        })
    }
    catch (error) {
        next (error)
    }
}

const showRecipesByUser = async(req, res, next) => {
    let isLoggedIn = !!req.cookies.access_token
    let linkText = isLoggedIn ? "Logout" : "Login/Sign Up"
    let pathText = isLoggedIn ? "logout" : "login"

    try {
    const allUsers = await User.find()
    res.render('recipesbyuser', {allUsers, isLoggedIn, linkText, pathText})
    } catch (error) {
        next(error)
    }
}

const getRecipesByUserId = async(req, res, next) => {
    let isLoggedIn = !!req.cookies.access_token
    let linkText = isLoggedIn ? "Logout" : "Login/Sign Up"
    let pathText = isLoggedIn ? "logout" : "login"
 
    const recipes = await Recipe.find({author: req.params.id})
    const author = await User.findById(req.params.id)
    res.render("userrecipes", {recipes, author, isLoggedIn, linkText, pathText})

}

//Nested functions
function separate() {
    const instructions = req.body.instructions
    const instructionsList = instructions.split('.')
    if (instructionsList[instructionsList.length] === "" || instructionsList[instructionsList.length] === " " || instructionsList[instructionsList.length] === undefined) {
        instructionsList.pop()
    }
    req.body.instructions = instructionsList

    const equipment = req.body.equipment
    const equipmentList = equipment.split(',')
    if (equipmentList[equipmentList.length] === "" || equipmentList[equipmentList.length] === " " || equipmentList[equipmentList.length] === undefined) {
        equipmentList.pop()
    }
    req.body.equipment = equipmentList

    const requiredIngredients = req.body.requiredIngredients
    const requiredIngredientsList = requiredIngredients.split(',')
    if (requiredIngredientsList[requiredIngredientsList.length] === "" || requiredIngredientsList[requiredIngredientsList.length] === " " || requiredIngredientsList[requiredIngredientsList.length] === undefined) {
        requiredIngredientsList.pop()
    }
    req.body.requiredIngredients = requiredIngredientsList

    const optionalIngredients = req.body.optionalIngredients
    const optionalIngredientsList = optionalIngredients.split(',')
    if (optionalIngredientsList[optionalIngredientsList.length] === "" || optionalIngredientsList[optionalIngredientsList.length] === " " || optionalIngredientsList[optionalIngredientsList.length] === undefined) {
        optionalIngredientsList.pop()
    }
    req.body.optionalIngredients = optionalIngredientsList

    const spices = req.body.spices
    const spicesList = spices.split(',')
    if (spicesList[spicesList.length] === "" || spicesList[spicesList.length] === " " || spicesList[spicesList.length] === undefined) {
        spicesList.pop()
    }
    req.body.spices = spicesList

    return req.body
}

module.exports = {
    showAllRecipes,
    getRecipeById,
    createRecipe,
    deleteRecipeById,
    updateRecipe,
    sendNewRecipeForm,
    sendEditRecipeForm,
    showRecipesByUser,
    getRecipesByUserId
}