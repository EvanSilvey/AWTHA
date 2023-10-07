const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController')

router.route('/')
    .get(movieController.getAllMovies)
    .post(movieController.createNewMovie)
    .delete(movieController.deleteMovie)

module.exports = router