const Movie = require('../models/Movie')
const List = require('../models/List')
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

// @desc Get all Movies
// @route GET /movies
// @access Private
const getAllMovies = asyncHandler(async (req, res) => {
    const movies = await Movie.find().lean()
    if(!movies?.length) {
        return res.status(400).json({message: 'No Movies in Database'})
    }

    const moviesWithUserandList = await Promise.all(movies.map(async (movie) => {
        const user = await User.findById(movie.user).lean().exec()
        const list = await List.findById(movie.list).lean().exec()
        return { ...movies, username: user.username, list: list.title }
    }))

    res.json(moviesWithUserandList)
})

// @desc Create new movie
// @route POST /movies
// @access Private
const createNewMovie = asyncHandler(async (req, res) => {
    const {user, list, rank, title, year, poster, review} = req.body

    // Confirm Data
    if (!user || !list || !rank || !title || !year || !poster) {
        return res.status(400).json({message: 'All Fields are Required'})
    }

    const duplicate = await Movie.findOne({ user, list, title}).lean().exec()

    if(duplicate) {
        return res.status(409).json({message: 'This list already has this movie'})
    }

    let movies = await Movie.find({ user, list }).lean()

    if (rank > movies.length + 1 || (rank != 1 && movies.length == 0)) {
        return res.status(409).json({message: 'Rank is past the last possible rank'})
    }
    
    var movieObject = {}

    review ? movieObject = {user, list, rank, title, year, poster, review} : movieObject = {user, list, rank, title, year, poster}

    // Check for duplicate
    const checkRank = await Movie.findOne({ user, list, rank }).lean().exec()

    let moviesArray = []

    let mov

    let findList

    let updatedList

    let updateMovie

    findList = await List.findById(list).exec()

    const movie = await Movie.create(movieObject)
    
    if(movie) { // created
        console.log(`New movie ${title} created`)
    } else {
        return res.status(400).json({message: 'Invalid movie data received'})
    }

    movies = await Movie.find({ user, list }).lean().sort({ rank: 1 })

    if(checkRank || rank >= movies.length) {
        for(let i = 0; i < movies.length; i++) {
            if (i < rank - 1) {
                moviesArray.push(movies[i])
            } else if (i > rank - 1) {
                updateMovie = await Movie.findById(movies[i]._id).exec()
                updateMovie.rank = i+1
                mov = await updateMovie.save()
                moviesArray.push(updateMovie)
            } else if (i == rank - 1 && JSON.stringify(movies[i]._id) === JSON.stringify(movie._id)) {
                // Create and Store New movie
                moviesArray.push(movie)
            } else if (i == rank - 1 && JSON.stringify(movies[i]._id) !== JSON.stringify(movie._id)){
                updateMovie = await Movie.findById(movies[i]._id).exec()
                updateMovie.rank = i+2
                console.log(updateMovie)
                mov = await updateMovie.save()
                moviesArray.push(movie)
                moviesArray.push(updateMovie)
                i++
            }
        }

        findList.movies = moviesArray

        updatedList = await findList.save()
    } else {
        moviesArray.push(movie)
        findList.movies = moviesArray

        updatedList = await findList.save()
    }
    res.status(201).json({message: `New movie created, List updated`})
})

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteMovie = asyncHandler(async (req, res) => {
    const { id } = req.body

    if(!id) {
        return res.status(400).json({message: 'Movie ID Required'})
    }

    const movie = await Movie.findById(id).exec()

    if(!movie) {
        return res.status(400).json({message: 'Movie not found'})
    }

    let user = movie.user
    let list = movie.list

    let movies = await Movie.find({ user , list }).lean().sort({ rank: 1 })

    let moviesArray = []

    let mov

    let findList

    findList = await List.findById(list).exec()

    let updatedList

    if(movie.rank < movies.length) {
        for(let i = 0; i < movies.length; i++) {
            if (i > movie.rank - 1) {
                updateMovie = await Movie.findById(movies[i]._id).exec()
                updateMovie.rank = i
                mov = await updateMovie.save()
                moviesArray.push(updateMovie)
            } else if (i < movie.rank - 1) {
                updateMovie = await Movie.findById(movies[i]._id).exec()
                moviesArray.push(updateMovie)
            }
        }

        findList.movies = moviesArray

        updatedList = await findList.save()
    } else {
        for (let i = movies.length - 2; i >= 0; i-- ) {
            updateMovie = await Movie.findById(movies[i]._id).exec()
            console.log(i + " " + updateMovie)
            moviesArray.push(updateMovie)
        }
        findList.movies = moviesArray.reverse()

        console.log(findList)

        updatedList = await findList.save()
    }

    const result = await movie.deleteOne()

    const reply = `Movie ${result.title} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllMovies,
    createNewMovie,
    deleteMovie
}