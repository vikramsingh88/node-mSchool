const Student = require('../model/student.model')
const Fee = require('../model/fees.model')

//create student
module.exports.addStudent = (req, res) => {
    console.log('Sudent : '+req.body)
    const newStudent = new Student({
        studentName : req.body.studentName,
        fatherName : req.body.fatherName,
        address : req.body.address,
        studentClass : req.body.studentClass,
        classTeacher : req.body.classTeacher,
        session : req.body.session
    })
    newStudent.image.data = req.body.image
    newStudent.image.contentType = 'image/png'
    newStudent.save().then((addedStudent) => {
        let buff = addedStudent.image.data
        let imageBase64 = buff.toString('base64')
        res.json({
            message : 'Student addess successfully',
            isSuccess : true,
            student : {
                studentName : addedStudent.studentName,
                image : imageBase64,
                fatherName : addedStudent.fatherName,
                address : addedStudent.address,
                studentClass : addedStudent.studentClass,
                classTeacher : addedStudent.classTeacher,
                session : addedStudent.session,
                date: addedStudent.date
            }
        })
    }).catch((error) => {
        console.log(error)
        res.json({
            message : 'Error in creating student',
            isSuccess : false
        })
    })
}

//update student
module.exports.updateStudentDetailes = (req, res) => {
    console.log('updating student by id '+req.body._id)
    Student.findOneAndUpdate({_id:req.body._id}, req.body)
    .then((updatedStudent) => {
        res.json({
            message : 'student updated successdully',
            isSuccess : true,
            student : updatedStudent
        });
    }).catch((error) => {
        console.log(error)
        res.json({
            message : 'Error in updating student',
            isSuccess : false,
        })
    })
}

//update student fees
module.exports.updateStudentFee = (req, res) => {
    console.log("updating student fees "+req.body._id)
    Fee.findOneAndUpdate({_id:req.body._id}, req.body)
    .then((updatedfee) => {
        res.json({
            message : 'Student fee updated successdully',
            isSuccess : true,
            fee : updatedfee
        });
    }).catch((error) => {
        console.log(error)
        res.json({
            message : 'Error in updating student fee',
            isSuccess : false,
        })
    })
}

//add student fees
module.exports.addStudentFee = (req, res) => {
    console.log("adding student fees")
    const newFee = new Fee(req.body)
    newFee.save().then((fee) => {
        res.json({
            message : 'Student fee added successdully',
            isSuccess : true,
            fee
        });
    }).catch((error) => {
        console.log(error)
        res.json({
            message : 'Error in adding student fee',
            isSuccess : false,
        })
    })
}

//get all student by class
module.exports.getStudentsByClass = (req, res) => {
    const className = req.params.class
    const session = req.params.session
    Student.find({studentClass : className, session})
    .then((students) => {
        //alter each student for image data
        let stdArr = []
        students.forEach((std) => {
            let buff = std.image.data
            let imageBase64
            if(buff === undefined) {

            } else {
                imageBase64 = buff.toString('binary')
            }
            let student = {
                studentName : std.studentName,
                image : imageBase64,
                fatherName : std.fatherName,
                address : std.address,
                studentClass : std.studentClass,
                classTeacher : std.classTeacher,
                session : std.session,
                date: std.date
            }
            stdArr.push(student)
        })
        res.json({
            message : "list of students fetches successfully",
            isSuccess : true,
            students : stdArr
        })
    }).catch((error) => {
        console.log(error)
        res.json({
            message : 'Error in getting list of students',
            isSuccess : false,
        })
    })
}

//get student fee
module.exports.getFeesByStudentId = (req, res) => {
    const studentId = req.params.studentId
    const session = req.params.session
    Fee.find({studentId, session})
    .then((fees) => {
        res.json({
            message : "list of students fetches successfully",
            isSuccess : true,
            fees
        })
    }).catch((error) => {
        console.log(error)
        res.json({
            message : 'Error in getting student fee',
            isSuccess : false
        })
    })
}

