const express = require('express')
const router = express.Router({mergeParams: true})
const auth = require('../middleware/auth.middleware')
const User = require('../models/User')

// api/myProfile/edit
router.put('/edit', auth, async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {new: true})
        res.send(updatedUser)
    } catch (e) {
        res.status(500).json({
            message: "Error occurred on server. Try again later"
        })
    }
})

// api/myProfile
router.get('/', auth, async (req, res) => {
    try {
        console.log(req.user)
        const user = await User.findById(req.user._id)
        res.send(user)
    } catch (e) {
        res.status(500).json({
            message: "Error occurred on server. Try again later"
        })
    }
})


module.exports = router