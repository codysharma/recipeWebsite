Project 2 - General Assembly Cookbook  
User stories detailing app functionality  
I want to search for a recipe and find the list of ingredients needed as well as directions to make the recipe.  
I want to upload a recipe to add to the collection.  
I want to edit a recipe that I uploaded.  
I want to be able to delete a recipe after it offends me.  
Stretch:  
I want to be able to choose favorite recipes of mine to my username, displaying my personalized list.  
I want to be able to search and display the recipes based on difficulty rating.  
I want to be able to see and vote on other users’ ratings of recipes.  

MVP + Stretch Goals  
Create home page with buttons for new recipe, create user, show all recipes  
Create “create user” page  
Create page to display user info and also allow editing user info and delete profile  
Create display all recipes page which gives link to recipe names  
Create recipe display page for individual recipe with info from Recipes model  
Allow editing of individual recipe page which then updates the object in the database  
Create a new recipe page  
Stretch:  
Create random recipe generator to appear on home page  
Create button to load random recipe from home page  
Create ability to add recipe to user’s liked list which will then display on the individual user’s page  
Add user id to recipe info to tag who created it. Display recipes created on individual user’s page  
Allow editing of recipes by only the user that created them  
Add buttons on front page to search recipes by difficulty rating  
Implement rating system for each recipe to display on individual recipe page as well as all recipes page next to the corresponding recipe name  
Potential for other projects:  
Search function to find keywords in ingredients list  
Search function to show all recipes by specific creator  

Wireframes with basic page layouts  
Pages:   
Home page with links  
All recipes page  
Individual recipe page  
Create recipe page  
Edit recipe page  
Create user page  
Edit user profile page  
Log in page  

Models including field names and their datatypes  
User  
ID - auto generated  
Required - Name (string)  
Required - Email (string)  
Password(?) (string)  
Stretch:  
Recipes they’ve posted (id num)  
How do we attach multiple here? Did get to that in the bookmarks lab  
Recipes they’ve liked (id num)  
Recipes  
ID - auto generated  
Required - Ingredients sub model  
Required - Directions sub model  
Stretch:   
Difficulty level (num)   
Creator (id num which will display the username)  
Rating from users (num)  
Ingredients  
ID - auto generated  
Required - Required ingredients - (string)  
How do we make this into a list rather than paragraph of text?  
Optional ingredients - (string)  
Instructions  
ID - auto generated  
Required - Equipment (string)  
Required - Directions (string)  

A list of routes (e.g. POST /pins/ allows users to post a picture of a pin)



