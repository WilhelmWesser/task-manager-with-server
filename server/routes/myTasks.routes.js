const express = require('express')
const router = express.Router({mergeParams: true})
const auth = require('../middleware/auth.middleware')
const Task = require('../models/Task')

// api/myTasks/edit/:taskId
router.put("/edit/:taskId", auth, async (req, res) => {
    try {
        const {taskId} = req.params
        const taskToEdit = await Task.findById(taskId)
        console.log(req.user)

        if (taskToEdit && req.user._id === taskToEdit.pageId) {
            const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {new: true})
            res.send(updatedTask)
        } else {
            res.status(401).json({message: 'Unauthorized'})
        }
    } catch (e) {
        res.status(500).json({
            message: "Error occurred on server. Try again later"
        })
    }
})

// api/myTasks
router.get('/', auth, async (req, res) => {
    try {
        console.log(req.user)
        const taskList = await Task.find()
        res.send(taskList)
    } catch (e) {
        res.status(500).json({
            message: "Error occurred on server. Try again later"
        })
    }
})


module.exports = router