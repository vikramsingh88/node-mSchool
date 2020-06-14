const mongoose = require('mongoose')

const Schema = mongoose.Schema

const messageSchema = new Schema({
    message : { type : String, required : true },
    stdClass : { type :String, required : true },
    session : { type :String, required : true },
    date: { type: Date, default: Date.now }
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message