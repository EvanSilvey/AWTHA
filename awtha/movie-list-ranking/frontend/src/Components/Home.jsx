import React from 'react';

function Home() {
    return (
      <div className="homepage">
        <h1 className="Large">Welcome to Rankd!</h1>

        <h2>Why Rankd?</h2>
        <p className="limit-width">
          During the quarantine, my high school friends and I began watching movies on
          discord to pass the time. We created a discord channel to store a list of all the movies we watched,
          keeping track of how we ranked each entry. 
        </p>
        <br></br>
        <p className="limit-width">
          This tradition continued into college, but a new problem
          surfaced. Discord on our roommate's iphone would not properly format his list, so his rankings were
          a jumbled mess of numbers and words. We had discussed moving to other platforms like Letterboxd, but
          we wanted a similar system where we could store all of our lists on the same page for easy viewing.
        </p>
        <br></br>
        <p className="limit-width">
          Rankd is my attempt of creating such a platform.
        </p>
        <br></br>
        <p className="limit-width">
          I started this project October 1st, 2023, and the current state is not my final vision for the site.
        </p>

        <h2>How can I use Rankd?</h2>
        <h3>Signing Up</h3>

        <p className="limit-width">
          You can view lists without being logged in; however, you do need to create an account to create and
          edit your own lists. Click on the Sign Up button on the navigation header to go to the sign up page.
          Signing up only requires a desired username and password, no email necessary. So long as no other 
          account has that username, it will be successfully created and stored in the database.
        </p>
        
        <h3>Logging In</h3>
        <p className="limit-width">
          Once you have created an account, you can sign in, giving you access to creating lists and editing
          previously made lists. You can still view other lists that are in the database, but you can only
          edit your own.
        </p>
        
        <h3>Creating a List</h3>
        <p className="limit-width">
          While logged in, the navigation header will show the Create List option. Click the button and you
          will be taken to the Create List page. Enter a title and description for your list and submit to
          have the database store your new list.
        </p>

        <h3>Adding to a List</h3>
        <p className="limit-width">
          Find your list among the lists of databases and click on its name. Since you are logged in and on
          your list, you will see the Add Movies section. Type in the search bar the movie you want to add and
          click on the poster. This works thanks to the OMDb API, providing a database of movies from IMDb to 
          choose from.You will see a rank and review entry appear on the screen.
        </p>
        <br></br>
        <p className="limit-width">
          The rank you enter must be a number and cannot be larger than how many movies would be on the List
          once this movie is added. Ex.: You cant have the movie ranked #2 if there are no movies on the list.
          The review entry is optional; the movie can be added with solely a rank if desired.
        </p>
        <br></br>
        <p className="limit-width">
          When adding a movie to a list of movies, the ranks will auto update without user involvement.
        </p>
        
        <h3>Deleting a movie from a List</h3>
        <p className="limit-width">
          When a movie is already on the list and you want to delete it, the delete button will be on the right.
          Only the user of the list will be able to see this when logged into their account. Click the delete
          button and wait for the movie to be deleted from the list and database. Your list will auto update all
          other movies' rankings without user involvement.
        </p>

        <h2>What what used to create Rankd?</h2>
        <h3>React, HTML, CSS, JS, Express, REST, MongoDB, OMDb API</h3>

        <h2>Future of Rankd</h2>
        <p className="limit-width">
          I don't have any current intentions to publish this site fully. I just hope to be able to finish the
          vision my roommates and I had of having a shared page for whatever movie lists we wanted to create.
        </p>
        <br></br>
        <p className="limit-width">
          My end goal is to create lists where multiple authorized users can be added and share a group of
          movies to create their own rankings on the same page.
        </p>

      </div>
    )
}

export default Home;