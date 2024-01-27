## Tech used: 
Express, EJS, Node, MongoDB, Atlas

## Overview
A full stack application using Express, Node, and EJS templating, this Recipe Website allows users to browse recipes saved to nonSQL database using MongoDB. Using JWT to authenticate login, after logging in, users have full CRUD capability to create recipes, edit their own recipes (but no others, as verified by their unique JWT), or delete their recipes. Visitors can also click on registered authors and see all the recipes by that author.

## Screenshots
The home page showing the major links, along with a randomly displayed recipe pulled from the database.
![image](https://github.com/codysharma/recipeWebsite/assets/123990673/39abc1ad-9ddc-4635-bec2-4dbaffc312d0)

The recipes page showing all recipes in the database.
![image](https://github.com/codysharma/recipeWebsite/assets/123990673/7599d481-d0cb-45bb-8082-69cfad209486)

The login and create user pages.
![image](https://github.com/codysharma/recipeWebsite/assets/123990673/5f1ab3cb-48e4-4918-8d2e-9f35e725d011)

![image](https://github.com/codysharma/recipeWebsite/assets/123990673/87cff3eb-06e9-4f04-9181-0c898a4bf88d)

The "create recipe" page, only accessible after login.
![image](https://github.com/codysharma/recipeWebsite/assets/123990673/8a5eb254-6c0e-461d-a7c4-09abe458764f)

The "view recipe" page, which anyone can see but only when the log in info of the visitor matches the author ID on the database entry does the "edit recipe" button appear.
![image](https://github.com/codysharma/recipeWebsite/assets/123990673/f31bcd89-b504-4864-905c-33edbc772d1b)

The "show all authors" page.
![image](https://github.com/codysharma/recipeWebsite/assets/123990673/a05c5252-d070-4746-b8fe-7055efbd3985)

Shows all recipes by that author.
![image](https://github.com/codysharma/recipeWebsite/assets/123990673/b7aec5ff-63d8-41d6-aee2-70ca1c061b46)

The "edit user" page.
![image](https://github.com/codysharma/recipeWebsite/assets/123990673/629f676c-9663-4379-ad7b-eda679f8f4f9)
