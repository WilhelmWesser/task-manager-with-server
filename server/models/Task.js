const {Schema, model} = require('mongoose')

const schema = new Schema({
    content: {type: String, required: true},
    heading: {type: String, required: true},
    pageId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    priority: {type: Object, required: true},
    responsible: {type: String, required: true},
    status: {type: String, required: true},
    terms: {type: String, required: true}
}, {
    timestamps: true
})

module.exports = model('Task', schema)