const express = require('express')
const router = express.Router({ mergeParams: true })

// api/auth
router.use('/auth', require('./auth.routes'))

// api/user
router.use('/user', require('./user.routes'))

// api/task
router.use('/task', require('./task.routes'))

module.exports = router