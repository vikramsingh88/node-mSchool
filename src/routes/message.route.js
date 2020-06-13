const twilo = require('twilio')

const Student = require('../model/student.model')

const ACCOUNT_SID = 'AC36be5ebfdfd5e3cd514572b5e000b23c'
const AUTH_TOKEN = 'ee94a5084bff042503f0e93f827cdd76'
const SERVICE_SID = 'IS365fe3a1e209c0444ad0829010691ca4'
const client = twilo(ACCOUNT_SID, AUTH_TOKEN)

module.exports.sendMessage = (req, res) => {
    console.log('send message '+JSON.stringify(req.body))
	//get all students by class name
	const message = req.body.message
    const studentClass = req.body.stdClass
	const session = req.body.session
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
	}).then(message => console.log(message.sid)).catch((error) => {
		console.log(error)
	})
}