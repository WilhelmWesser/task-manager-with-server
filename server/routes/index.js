const express = require('express')
const router = express.Router({ mergeParams: true })

// api/auth
router.use('/auth', require('./auth.routes'))

router.use('/myTasks', require('./myTasks.routes'))
router.use('/myProfile', require('./myProfile.routes'))
router.use('/createTask', require('./createTask.routes'))

module.exports = router