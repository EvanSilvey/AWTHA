import React from 'react';

const MovieInfoOverlay = (props) => {
    return (
        <>
            <p>{props.movie.Title}</p>
            <p>{props.movie.Year}</p>
        </>
    )
}

export default MovieInfoOverlay;