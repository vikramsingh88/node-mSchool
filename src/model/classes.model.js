const mongoose = require('mongoose')

const Schema = mongoose.Schema

const classesSchema = new Schema({
    classTeacherName : { type : String, required : true },
    className : { type :String, required : true },
    classFees : { type :String, required : true },
    classExamFees : { type :String, required : true },
    date: { type: Date, default: Date.now }
})

const Classes = mongoose.model('Classes', classesSchema)

module.exports = Classes