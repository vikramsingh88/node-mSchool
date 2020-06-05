const Classes = require('../model/classes.model')

//add classes
module.exports.addClasses = (req, res) => {
    console.log("adding a new class")
    const newClasses = new Classes(req.body)
    newClasses.save().then((cls) => {
        res.json({
            message : 'New class added successdully',
            isSuccess : true,
            classes : cls
        });
    }).catch((error) => {
        console.log(error)
        res.json({
            message : 'Error in adding new class',
            isSuccess : false,
        })
    })
}

//update class by class name
module.exports.updateClass = (req, res) => {
    console.log('updating class for class id '+req.body._id)
    Classes.findOneAndUpdate({_id:req.body._id}, req.body)
    .then((updatedClass) => {
        res.json({
            message : 'class updated successdully',
            isSuccess : true,
            classes : updatedClass
        });
    }).catch((error) => {
        console.log(error)
        res.json({
            message : 'Error in updating class',
            isSuccess : false,
        })
    })
}

//get classes
module.exports.getClasses = (req, res) => {
    Classes.find({session : req.params.session})
    .then((classes) => {
        res.json({
            message : "list of classes fetches successfully",
            isSuccess : true,
            classes
        })
    }).catch((error) => {
        console.log(error)
        res.json({
            message : 'Error in getting list of classes',
            isSuccess : false,
        })
    })
}

//get class teacher name by class
module.exports.getClassTeacherByClass = (req, res) =>{
    const className = req.params.className
    const session = req.params.session
    Classes.findOne({className : className, session})
    .then((cls) => {
        res.json({
            message : "Class teacher fetches successfully",
            isSuccess : true,
            classTeacherName : cls.classTeacherName
        })
    }).catch((error) => {
        console.log(error)
        res.json({
            message : 'Error in getting class teacher',
            isSuccess : false,
        })
    })
}

//get class fees by class name
module.exports.getClassMonthlyFeesByClass = (req, res) =>{
    const className = req.params.className
    const session = req.params.session
    Classes.findOne({className : className, session})
    .then((cls) => {
        res.json({
            message : "Class monthly fees fetches successfully",
            isSuccess : true,
            classFees : cls.classFees
        })
    }).catch((error) => {
        console.log(error)
        res.json({
            message : 'Error in getting class monthly fees',
            isSuccess : false,
        })
    })
}

//get exam fee by class name
module.exports.getClassExamFeesByClass = (req, res) =>{
    const className = req.params.className
    const session = req.params.session
    Classes.findOne({className : className, session})
    .then((cls) => {
        res.json({
            message : "Class exam fees fetches successfully",
            isSuccess : true,
            classExamFees : cls.classExamFees
        })
    }).catch((error) => {
        console.log(error)
        res.json({
            message : 'Error in getting class exam fees',
            isSuccess : false,
        })
    })
}

//get class and exam fee by class name
module.exports.getClassfeesByClass = (req, res) =>{
    const className = req.params.className
    const session = req.params.session
    Classes.findOne({className : className, session})
    .then((cls) => {
        res.json({
            message : "Class exam fees fetches successfully",
            isSuccess : true,
            classFees : cls.classFees,
            classExamFees : cls.classExamFees
        })
    }).catch((error) => {
        console.log(error)
        res.json({
            message : 'Error in getting class exam fees',
            isSuccess : false,
        })
    })
}