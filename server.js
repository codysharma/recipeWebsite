const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const port = 2357

app.set('view engine', 'ejs')
app.use(ejsLayouts)

const indexRouter = require('./routes/index')
app.use('/', indexRouter)

app.listen(port, () => {
    console.log("We're cooking using some Port Wine on " + port);
})