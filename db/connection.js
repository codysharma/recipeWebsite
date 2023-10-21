const mongoose = require('mongoose')

const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lrw9ltd.mongodb.net/recipeWebsite?retryWrites=true&w=majority`

const port = process.env.port || 3001;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
  console.log(`Connected to database on connectionString`);
})

mongoose.connection.on('disconnected', () => {
  console.log(`Disconnected from database ${connectionString}`);
})

mongoose.connection.on('error', (error) => {
  console.log(`Error connecting to ${connectionString}`);
  console.error(error);
})

module.exports = {connectionString, port};