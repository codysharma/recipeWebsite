const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const {connectionString, port} = require('./db/connection');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

//connection to styling
app.use('/public', express.static('public'));
app.use(methodOverride("_method"))

//middleware - has to be before routes
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({
    extended: false
}))

//Routes
const indexRouter = require('./routes/index')
app.use('/', indexRouter)
const recipesRouter = require('./routes/recipes')
app.use('/recipes', recipesRouter)
// const ingredientsRouter = require('./routes/ingredients')
// app.use('/ingredients', ingredientsRouter)
const userRouter = require('./routes/user')
app.use('/users', userRouter)

//start server
const startServer = async () => {
    await mongoose.connect(connectionString);
    //After connecting to DB, turn on my server
    app.listen(port, () => console.log(`We're cooking using some Port Wine on ${port}`))
}

startServer();

//-----Event listeners
// const likeButton = document.querySelector('#likeButton');
// likeButton.addEventListener("click", function(event) { 
//     console.log("clicked"); 
// }) 
