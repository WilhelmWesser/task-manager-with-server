const {Schema, model} = require('mongoose')

const schema = new Schema({
    canWaitForExecution: {type: String, required: true},
    rate: {type: String, required: true}
}, {
    timestamps: true
})

module.exports = model('Priority', schema)