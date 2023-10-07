const express = require('express');
const router = express.Router();
const usersListsController = require('../controllers/userListsController')

router.route('/')
    .get(usersListsController.getAllLists)
    .post(usersListsController.createNewList)
    .patch(usersListsController.updateList)
    .delete(usersListsController.deleteList)

module.exports = router