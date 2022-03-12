const express = require('express')
const router = express.Router({ mergeParams: true })
const auth = require('../middleware/auth.middleware')
const Task = require('../models/Task')

// api/createTask
router.put('/', auth, async (req, res) => {
    try {
        const newTask = await Task.create({
            ...req.body,
            pageId: req.user._id
        })
        res.status(201).send(newTask)
    } catch (e) {
        res.status(500).json({
            message: "Error occurred on server. Try again later"
        })
    }
})

module.exports = router