const express = require('express')
const router = express.Router({mergeParams: true})
const auth = require('../middleware/auth.middleware')
const Task = require('../models/Task')


// api/task/
router.get('/', auth, async (req, res) => {
    try {
        const {orderBy, equalTo} = req.query
        const tasksList = await Task.find({ [orderBy]: equalTo })
        res.send(tasksList)
    } catch (e) {
        res.status(500).json({
            message: "Error occurred on server. Try again later"
        })
    }
})

// api/task/:taskId
router.get('/:taskId', auth, async (req, res) => {
    try {
        const {taskId} = req.params
        const taskToSend = await Task.findById(taskId)
        res.send(taskToSend)
    } catch (e) {
        res.status(500).json({
            message: "Error occurred on server. Try again later"
        })
    }
})

// api/task/create/:taskId
router.post('/create/:taskId', auth, async (req, res) => {
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

// api/task/edit/:taskId
router.put("/edit/:taskId", auth, async (req, res) => {
    try {
        const {taskId} = req.params
        const taskToEdit = await Task.findById(taskId)

        if (taskToEdit && req.user._id === taskToEdit.pageId.toString()) {
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

// api/task/:taskId
router.delete('/:taskId', auth, async (req, res) => {
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