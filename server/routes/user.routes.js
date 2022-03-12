const express = require('express')
const router = express.Router({mergeParams: true})
const auth = require('../middleware/auth.middleware')
const User = require('../models/User')

// api/user/:userId
router.get('/:userId', auth, async (req, res) => {
    try {
        const {userId} = req.params
        const user = await User.findById(userId)
        res.send(user)
    } catch (e) {
        res.status(500).json({
            message: "Error occurred on server. Try again later"
        })
    }
})

// api/user/update/:taskId
router.put('/:userId', auth, async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {new: true})
        res.send(updatedUser)
    } catch (e) {
        res.status(500).json({
            message: "Error occurred on server. Try again later"
        })
    }
})


module.exports = router