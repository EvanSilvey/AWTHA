const express = require('express');
const fetch = require("cross-fetch");
const bodyParser = require('body-parser');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcrypt')

router.use(function(req, res, next) {
    console.log("got", req.method, "at", req.url, req.body);
    next();
})

router.use('/users', require('./userRoutes'))

router.use('/lists', require('./listsRoutes'))

router.use('/movies', require('./moviesRoutes'))

router.get("/api", (req, res) => {
    const userData = [ {  "users": ["userOne", "userTwo", "userThree"] }];
    res.send(userData);
})

router.post("/query/movies", async (req, res, next) => {
    console.log("Getting Movies...");
    console.log(req.body);
    const { searchValue } = req.body
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=1f777e39`;

    const data = await fetch(url);

    const movies = JSON.parse(await data.text());

    console.log("Returning", movies);
    res.json(movies);
})

router.post("/signin", async (req, res) => {
    const {username, password} = req.body

    // Confirm Data
    if (!username || !password) {
        return res.status(400).json({message: 'User, Title, and Description are required'})
    }

    const user = await User.findOne({ username })
    if (!user) {
        return res.status(401).json({message: 'Invalid Username or Password'})
    }

    const validPwd = await bcrypt.compare(
        password, user.password
    )

    if (!validPwd) {
        return res.status(401).json({message: 'Invalid Username or Password'})
    }

    const token = user.generateAuthToken();

    if (!token) {
        return res.status(400).json({message: 'Error'})
    }

    res.status(200).json({data: token, message: "Logged In Successfully"})
})

module.exports = router;