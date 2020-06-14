const Student = require('../model/student.model')
const Fee = require('../model/fees.model')
const messageRoute = require('./message.route')

//create student
module.exports.addStudent = (req, res) => {
    console.log('Sudent : '+req.body)
    const newStudent = new Student({
        studentName : req.body.studentName,
        fatherName : req.body.fatherName,
        address : req.body.address,
        studentClass : req.body.studentClass,
        classTeacher : req.body.classTeacher,
        session : req.body.session,
		mobile : req.body.mobile,
        transport : req.body.transport,
        createdBy : req.body.createdBy
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
				_id : addedStudent._id,
                studentName : addedStudent.studentName,
                image : imageBase64,
                fatherName : addedStudent.fatherName,
                address : addedStudent.address,
                studentClass : addedStudent.studentClass,
                classTeacher : addedStudent.classTeacher,
                session : addedStudent.session,
                date: addedStudent.date,
				mobile : addedStudent.mobile,
                transport : addedStudent.transport,
                createdBy : addedStudent.createdBy
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
	    const newStudent = new Student({
			_id : req.body._id,
			studentName : req.body.studentName,
			fatherName : req.body.fatherName,
			address : req.body.address,
			studentClass : req.body.studentClass,
			classTeacher : req.body.classTeacher,
			session : req.body.session,
			mobile : req.body.mobile,
            transport : req.body.transport,
            date : new Date(req.body.date),
    })
    newStudent.image.data = req.body.image
    newStudent.image.contentType = 'image/png'
    Student.findOneAndUpdate({_id:req.body._id}, newStudent)
    .then((updatedStudent) => {
		let buff = updatedStudent.image.data
        let imageBase64 = buff.toString('binary')
        res.json({
            message : 'student updated successdully',
            isSuccess : true,
            student : {
				_id : updatedStudent._id,
                studentName : updatedStudent.studentName,
                image : imageBase64,
                fatherName : updatedStudent.fatherName,
                address : updatedStudent.address,
                studentClass : updatedStudent.studentClass,
                classTeacher : updatedStudent.classTeacher,
                session : updatedStudent.session,
                date: updatedStudent.date,
				mobile : updatedStudent.mobile,
                transport : updatedStudent.transport,
                createdBy : updatedStudent.createdBy
                
            }
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
	console.log('updated fees advance - '+req.body.advanceFee)
    Fee.findOneAndUpdate({_id:req.body._id}, req.body)
    .then((updatedfee) => {
		console.log('updated fees advance - '+updatedfee)
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
    console.log("adding student fees "+req.body.mobile)
    const newFee = new Fee(req.body)
    newFee.save().then((fee) => {
        res.json({
            message : 'Student fee added successdully',
            isSuccess : true,
            fee
        });
		//send fee submited message
		if(req.body.mobile === undefined) {
			console.log('message can not sent because no mobile available')
		} else {
			let messageBody = `${req.body.name} ${fee.feeType} fees for the month of ${req.body.month} Rs ${req.body.amount} is submitted successfully.\nSMT Rooprani Vidya Mandir Lilambarpur Fatehpur`
			messageRoute.sendBulkMessages(messageBody, req.body.mobile)
		}
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
				_id : std._id,
                studentName : std.studentName,
                image : imageBase64,
                fatherName : std.fatherName,
                address : std.address,
                studentClass : std.studentClass,
                classTeacher : std.classTeacher,
                session : std.session,
                date: std.date,
				mobile : std.mobile,
                transport : std.transport,
                createdBy : std.createdBy
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

