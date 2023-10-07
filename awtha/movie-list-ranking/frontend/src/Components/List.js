import React, { useState } from 'react';
import MovieSetup from "./MovieSetup";
import InfoOverlay from "./MovieInfoOverlay";

function List(props) {
  const [addingMovie, setAddingMovie] = useState(false);
  const [savedMovie, setSavedMovie] = useState(false);
  // eslint-disable-next-line
  const [clickedMovie, setClickedMovie] = useState(null);

  const openPopup = (movie) => {
    setClickedMovie(movie);
    setSavedMovie(movie);
    setAddingMovie(true);
  };

    return (
      <div className="item-container">
        {props.items.map((movie, index) => 
        (
          <div key={index} className="items">
            <img onClick={() => openPopup(movie)} src={movie.Poster} alt='movie' className='movie-image'></img>
            <div className="overlay"><InfoOverlay movie={movie}/></div>
          </div>
        ))}
        <MovieSetup trigger={addingMovie} setTrigger={setAddingMovie} addMovie={props.addMovie}  setAddMovie={props.setAddMovie} RnR={props.RnR} setRnR={props.setRnR} movie={savedMovie}/>
      </div>
    )
}

export default List;