const express = require('express')
const router = express.Router({ mergeParams: true })

// api/auth
router.use('/auth', require('./auth.routes'))

// api/myTasks
router.use('/myTasks', require('./myTasks.routes'))

// api/myProfile
router.use('/myProfile', require('./myProfile.routes'))

// api/createTask
router.use('/createTask', require('./createTask.routes'))

module.exports = router