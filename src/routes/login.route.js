module.exports.authenticate = (req, res) => {
    const user = req.body
    console.log('user name '+user.userName)
    console.log('password '+user.password)
    if(user.userName === 'mySchool' && user.password === 'mySchool') {
        res.json({
            userName : user.userName,
            isSuccess : true
        })
    } else {
        res.json({
            userName : user.userName,
            isSuccess : false
        })
    }
}