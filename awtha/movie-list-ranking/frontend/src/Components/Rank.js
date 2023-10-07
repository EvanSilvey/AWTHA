import React, { useState, useEffect } from 'react';
import Search from "./SearchBar";
import List from "./List";
import DisplayMovie from "./DisplayMovie";

const server_url = 'http://10.0.0.209:11037';

function Rank(props) {
  const [addMovie, setAddMovie] = useState([]);
  const [RankandReview, setRnR] = useState({"rank": 0, "review": ''});

  const username = localStorage.getItem("username");

  const postMovieRequest = async (movie) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"user": props.list.user,
                            "list": props.list._id,
                            "rank": RankandReview.rank,
                            "title": movie.Title,
                            "year": movie.Year,
                            "poster": movie.Poster,
                            "review": RankandReview.review
                          })
    }
    
    const response = await fetch(server_url + '/movies', options);

    const res = await response.json();
    
    props.setReset(res);
  }

  useEffect(() => {
    postMovieRequest(addMovie);
    // eslint-disable-next-line
  }, [addMovie]);

    return (
      <div>
        <div className="Rankd-List">
          <h1 className="Large">{props.list.title}</h1>
          <h2 className="fix-h">{props.list.text}</h2>
          <h3>Created By: {props.list.username}</h3>

          {props.list.movies?.length !== 0 && 
            <div className="display-movies">
              {props.list.movies !== null && props.list.movies.map((movie, index)=> (
                <DisplayMovie key={index} username={props.list.username} movie={movie} reset={props.reset} setReset={props.setReset}/>
              ))}
            </div>}
        </div>

        <div className="add-movies">
        {username===props.list.username && <div className="extra-margin">
            <h1>Add Movies</h1>
            <Search searchValue={props.searchValue} setSearchValue={props.setSearchValue}/>
            <List items={props.movies} addMovie={addMovie}  setAddMovie={setAddMovie} RnR={RankandReview} setRnR={setRnR}/>
          </div>}
        </div>
      </div>
    )
}

export default Rank;