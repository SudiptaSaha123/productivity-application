const express = require('express')
const router = express.Router()

const {allTodos, createTodo, editTodo, deleteTodo} = require('../controllers/Todo')
const authenticateUser = require('../middlewares/authenticateUser')

router.get('/', authenticateUser, allTodos)
router.post('/', authenticateUser, createTodo)
router.put('/:id', authenticateUser, editTodo)
router.delete('/:id', authenticateUser, deleteTodo)

module.exports = router