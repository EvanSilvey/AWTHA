import React, { useState, useEffect } from 'react';

function MovieSetup(props) {
    const [newRank, setRank] = useState();
    const [newReview, setReview] = useState('');
    const [submit, setSubmit] = useState(false);

    useEffect(() => {
        props.setRnR({"rank": newRank, "review": newReview});
        props.setTrigger(false);
        props.setAddMovie({"Title": props.movie.Title,
                           "Year": props.movie.Year,
                           "Poster": props.movie.Poster});
        setRank();
        setReview('');
        // eslint-disable-next-line
    }, [submit]);
    
    return (props.trigger) ? (
      <div className="pop">
        <div className="pop-in">
            <div className="setRank">
                <h1>Set Rank</h1>
                <input className="rank" type="number" value={newRank || ''} onChange={(event) => setRank(event.target.value)}></input>
            </div>

            <div className="setReview">
                <h1>Optional: Create Review</h1>
                <textarea className="desc" value={newReview} onChange={(event) => setReview(event.target.value)}></textarea>
            </div>

            <button onClick={setSubmit}>Add Movie</button>
        </div>
      </div>
    ) : ''
}

export default MovieSetup;