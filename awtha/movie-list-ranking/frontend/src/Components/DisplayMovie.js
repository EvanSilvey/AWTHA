import React from 'react';

const server_url = 'http://10.0.0.209:11037';

function DisplayMovie(props) {

  const username = localStorage.getItem("username");

  const deleteMovieRequest = async () => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"id": props.movie._id})
    }
    
    const response = await fetch(server_url + '/movies', options);

    const res = await response.json();

    console.log(res);

    props.setReset(res)
  }

  return (
    <>
      <div className="rank-rows">
        <h1 className="fixed-rank-width">{props.movie.rank}</h1>
        <img src={props.movie.poster} alt='movie' className='movie-image-2'></img>
        <h2 className="fixed-title-width">{props.movie.title}</h2>
        <h2>{props.movie.year}</h2>
        {props.username === username && 
        <button className="delete-fix" onClick={deleteMovieRequest}>Delete</button>}
      </div>
      {props.movie.review !== '' && <div className='review'>
        <h3>Review</h3>
        <p className = "review">{props.movie.review}</p>
      </div>}
    </>
  )
}

export default DisplayMovie;