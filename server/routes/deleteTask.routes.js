const express = require('express')
const router = express.Router({ mergeParams: true })
const auth = require('../middleware/auth.middleware')
const Task = require('../models/Task')

// api/deleteTask/:taskId
router.delete('/deleteTask/:taskId', auth, async (req, res) => {
    try {
        const {taskId} = req.params
        const removedTask = await Task.findById(taskId)

        if (removedTask.pageId.toString() === req.user._id) {
            await removedTask.remove()
            return res.send(null)
        } else {
            return res.status(401).json({message: 'Unauthorized'})
        }
    } catch (e) {
        res.status(500).json({
            message: "Error occurred on server. Try again later"
        })
    }
})

module.exports = router