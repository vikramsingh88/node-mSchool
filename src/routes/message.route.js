const twilo = require('twilio')

const Student = require('../model/student.model')
const Message = require('../model/message.model')

const ACCOUNT_SID = process.env.ACCOUNT_SID // read from sys property
const AUTH_TOKEN = process.env.AUTH_TOKEN // read from sys property
const SERVICE_SID = process.env.SERVICE_SID // read from sys property
const client = twilo(ACCOUNT_SID, AUTH_TOKEN)

module.exports.sendMessage = (req, res) => {
    console.log('send message '+JSON.stringify(req.body))
	//get all students by class name
	const message = req.body.message
    const studentClass = req.body.stdClass
	const session = req.body.session

	//save message to db then send message
	console.log("adding a new message")
    const newMessage = new Message(req.body)
    newMessage.save().then((msg) => {
		if('All' === studentClass) {
			getStudentsBySession(session, (error, mobiles) => {
				if(error === undefined) {
					var contacts = []; 
					for(i = 0; i < mobiles.length; i++) { 
						if(undefined !==mobiles[i]) {
							contacts.push(JSON.stringify(
								{
									binding_type: 'sms', 
									address: mobiles[i]
								}
							))
						}
					} 
					console.log(JSON.stringify(contacts))
					const notificationOpts = { 
						toBinding: contacts, 
						body: message, 
					}
					client.notify.services(SERVICE_SID).notifications.create(notificationOpts) 
					.then((notification) => {
						console.log('Message sent', JSON.stringify(notification))
						res.json({
							message : 'Message sent successfully',
							isSuccess : true
						})
					}).catch((error) => {
						console.log(error)
						res.json({
							message : 'Message sent failed',
							isSuccess : false
						})
					})
				} else {
					console.log('error in getting contacts list so cannot send broadcast')
					res.json({
						message : 'Message sent failed',
						isSuccess : false
					})
				}
			})
		} else {
			getStudentsByClass(studentClass, session, (error, mobiles) => {
				if(error === undefined) {
					var contacts = []; 
					for(i = 0; i < mobiles.length; i++) { 
						if(undefined !==mobiles[i]) {
							contacts.push(JSON.stringify(
								{
									binding_type: 'sms', 
									address: mobiles[i]
								}
							))
						}
					} 
					console.log(JSON.stringify(contacts))
					const notificationOpts = { 
						toBinding: contacts, 
						body: message, 
					}
					client.notify.services(SERVICE_SID).notifications.create(notificationOpts) 
					.then((notification) => {
						console.log('Message sent', JSON.stringify(notification))
						res.json({
							message : 'Message sent successfully',
							isSuccess : true
						})
					}).catch((error) => {
						console.log(error)
						res.json({
							message : 'Message sent failed',
							isSuccess : false
						})
					})
				} else {
					console.log('error in getting contacts list so cannot send broadcast')
					res.json({
						message : 'Message sent failed',
						isSuccess : false
					})
				}
			})
		}
    }).catch((error) => {
        console.log(error)
        res.json({
            message : 'Error in adding new message',
            isSuccess : false,
        })
    }) 
}

const getStudentsByClass = (className, session, callback) => {
	Student.find({studentClass : className, session})
    .then((students) => {
		let contacts = []
		students.forEach((std) => {
			contacts.push(std.mobile)
		})
		callback(undefined, contacts)
	}).catch((error) => {
        console.log(error)
		callback(error)
    })
}

//Send message to a mobile
module.exports.sendMessageToContact = (req, res) => {
	const mobile = req.params.mobile
	const message = req.body.message
    const studentClass = req.body.stdClass
	const session = req.body.session
	const newMessage = new Message(req.body)
	newMessage.save().then((msg) => {
		client.messages.create({
			body: message,
			from: '+12058394489',
			to: mobile
		}).then((message) => {
			console.log('Message sent successfully')
				res.json({
				message : 'Message sent successfully',
				isSuccess : true
			})
		}).catch((error) => {
			console.log(error)
		})
	}).catch((error) => {
		console.log(error)
		res.json({
			message : 'Error in adding new message',
			isSuccess : false,
		})
	})
}

//All students of current session
const getStudentsBySession = (session, callback) => {
	Student.find({session})
    .then((students) => {
		let contacts = []
		students.forEach((std) => {
			contacts.push(std.mobile)
		})
		callback(undefined, contacts)
	}).catch((error) => {
        console.log(error)
		callback(error)
    })
}

module.exports.sendBulkMessages = (messageBody, mobile) => { 
	client.messages.create({
		body: messageBody,
		from: '+12058394489',
		to: mobile
	}).then(message => console.log('Message sent successfully')).catch((error) => {
		console.log(error)
	})
}

//All messages of current session
module.exports.getAllMessagesBySession = (req, res) => {
	const session = req.params.session
	Message.find({session})
    .then((msgs) => {
		res.json({
			message : 'All messages fetched successfully',
			msgs,
            isSuccess : true,
        })
	}).catch((error) => {
		console.log(error)
		res.json({
            message : 'Error in adding new message',
            isSuccess : false,
        })
    })
}