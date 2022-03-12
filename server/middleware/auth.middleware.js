const tokenService = require('../services/token.service')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        // Bearer ewklmfwlmfwmffklfnwlwfnwnlsc
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: 'Unauthorized'})
        }

        req.user = tokenService.validateAccess(token)

        next()
    } catch (e) {
        res.status(401).json({message: 'Unauthorized'})
    }
}