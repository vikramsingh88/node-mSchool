const mongoose = require('mongoose')

const Schema = mongoose.Schema

const studentSchema = new Schema({
    studentName : {type : String, required : true},
    image: {data: Buffer, contentType: String},
    fatherName : {type :String,required : true},
    address : {type :String,required : true},
    studentClass : {type :String,required : true},
    classTeacher : {type :String,required : true},
    session : { type :String, required : true },
    date: {type: Date, default: Date.now}
})

const Student = mongoose.model('Student', studentSchema)

module.exports = Student