const express = require('express')
const router = express.Router()
const {signin, signup, signout} = require('../controllers/Auth')

router.post('/signin', signin)
router.post('/signup', signup)
router.post('/signout', signout)

module.exports = router