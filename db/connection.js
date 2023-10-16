const mongoose = require('mongoose')

// const connectionString = 'mongodb://127.0.0.1:27017/recipewebsite';
//How do we make the database we want to?

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

module.exports = mongoose