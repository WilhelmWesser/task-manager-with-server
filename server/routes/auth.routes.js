const express = require('express')
const User = require('../models/User')
const router = express.Router({ mergeParams: true })

// api/auth/signUp
// 1. get data from req (name, email, password)
// 2. check if user already exists
// 3. hash password
// 4. create user
// 5. generate tokens
router.post('/signUp', async (req, res) => {
    try {
        const {email, password} = req.body

        User.findOne()
    } catch (e) {
        res.status(500).json({
            message: "Error occurred on server. Try again later"
        })
    }
})

router.post('/signInWithPassword', async (req, res) => {

})

router.post('/token', async (req, res) => {

})

module.exports = router