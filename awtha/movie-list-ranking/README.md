# Warning
The database works and is completely set up. I have never used gitignore before and that is what I used
to keep my database info private. If the database does not work, please feel free to contact me for the
backend .env or allow me to demo the website

Update: I have included the .env file in the application

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

To start the frontend and backend, cd into the frontend on one terminal and the backend in a second terminal.

In both directories, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://10.0.0.209:3000](http://10.0.0.209:3000) to view it in your browser.

# Signing Up
You can view lists without being logged in; however, you do need to create an account to create and edit your 
own lists. Click on the Sign Up button on the navigation header to go to the sign up page. Signing up only 
requires a desired username and password, no email necessary. So long as no other account has that username, 
it will be successfully created and stored in the database.

# Logging In
Once you have created an account, you can sign in, giving you access to creating lists and editing previously 
made lists. You can still view other lists that are in the database, but you can only edit your own.

# Creating a List
While logged in, the navigation header will show the Create List option. Click the button and you will be 
taken to the Create List page. Enter a title and description for your list and submit to have the database 
store your new list.

# Adding to a List
Find your list among the lists of databases and click on its name. Since you are logged in and on your list, 
you will see the Add Movies section. Type in the search bar the movie you want to add and click on the poster. 
This works thanks to the OMDb API, providing a database of movies from IMDb to choose from.You will see a rank 
and review entry appear on the screen.


The rank you enter must be a number and cannot be larger than how many movies would be on the List once this 
movie is added. Ex.: You cant have the movie ranked #2 if there are no movies on the list. The review entry is 
optional; the movie can be added with solely a rank if desired.


When adding a movie to a list of movies, the ranks will auto update without user involvement.

# Deleting a movie from a List
When a movie is already on the list and you want to delete it, the delete button will be on the right. Only the 
user of the list will be able to see this when logged into their account. Click the delete button and wait for 
the movie to be deleted from the list and database. Your list will auto update all other movies' rankings 
without user involvement.

