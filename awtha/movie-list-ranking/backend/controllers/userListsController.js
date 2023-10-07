const List = require('../models/List')
const User = require('../models/User')
const Movie = require('../models/Movie')
const asyncHandler = require('express-async-handler')

// @desc Get all lists
// @route GET /lists
// @access Private
const getAllLists = asyncHandler(async (req, res) => {
    const lists = await List.find().lean().sort({ title: 1 })
    if(!lists?.length) {
        return res.status(400).json({message: 'No Lists in Database'})
    }

    const listsWithUser = await Promise.all(lists.map(async (list) => {
        const user = await User.findById(list.user).lean().exec()
        return { ...list, username: user.username }
    }))

    res.json(listsWithUser)
})

// @desc Create new user
// @route POST /users
// @access Private
const createNewList = asyncHandler(async (req, res) => {
    const {user, title, text} = req.body

    // Confirm Data
    if (!user || !title || !text) {
        return res.status(400).json({message: 'User, Title, and Description are required'})
    }

    const duplicate = await List.findOne({ user, title }).lean().exec()

    if(duplicate) {
        return res.status(409).json({message: 'This user already has this list'})
    }

    const listObject = {user, title, text }

    // Create and Store New list
    const list = await List.create(listObject)

    if(list) { // created
        res.status(201).json({message: `New list ${title} created`})
    } else {
        return res.status(400).json({message: 'Invalid list data received'})
    }
})

// @desc Update a list
// @route PATCH /lists
// @access Private
const updateList = asyncHandler(async (req, res) => {
    const {id, user, title, text, movies} = req.body

    // Confirm Data
    if (!id || !user || !title || !text) {
        return res.status(400).json({message: 'All fields are required'})
    }

    const list = await List.findById(id).exec()

    if(!list) {
        return res.status(400).json({message: 'list not found'})
    }

    // Check for duplicate
    const duplicate = await List.findOne({ title }).lean().exec()

    if(duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({message: 'list already exists for this user'})
    }

    list.title = title
    list.user = user
    list.text = text
    list.movies = movies

    const updatedlist = await list.save()

    res.json({message: `${updatedlist.title} updated`})
})

// @desc Update a list's movies
// @route PATCH /lists
// @access Private
const updateListMovies = asyncHandler(async (req, res) => {
    const { id, movie } = req.body

    // Confirm Data
    if (!movie) {
        return res.status(400).json({message: 'A movie is required'})
    }

    const list = await List.findById(id).exec()

    if(!list) {
        return res.status(400).json({message: 'list not found'})
    }

    // Check for duplicate
    const duplicate = await List.findOne({ user, title }).lean().exec()

    if(duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({message: 'list already exists for this user'})
    }

    list.title = title
    list.text = text

    const updatedlist = await list.save()

    res.json({message: `${updatedlist.title} updated`})
})

// @desc Delete a list
// @route DELETE /lists
// @access Private
const deleteList = asyncHandler(async (req, res) => {
    const { id } = req.body

    if(!id) {
        return res.status(400).json({message: 'List ID Required'})
    }

    const list = await List.findById(id).exec()

    if(!list) {
        return res.status(400).json({message: 'List not found'})
    }

    const result = await list.deleteOne()

    const reply = `listname ${result.title} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllLists,
    createNewList,
    updateList,
    updateListMovies,
    deleteList
}