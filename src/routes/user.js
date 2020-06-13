let express = require('express');
let router = express.Router();
let User = require('../model/user.model');
let passport = require('passport');
let jsonwebtoken = require('jsonwebtoken');
let config = require('../config/config');

//Register api
router.post('/register', (req, res) => {
    let newUser = new User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        username : req.body.username,
        password : req.body.password,
        admin : req.body.admin
    });

    User.addUser(newUser, (err, user) => {
        if(err) {
            res.json({'success' : false, msg : 'Failed to register user'});
        } else {
            res.json({'success' : true, msg : 'User registerd'});
        }
    });
});

//Authentication api
router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user) {
            return res.json({'success' : false, 'message' : 'User not found'});
        }
        User.comparePassword(password, user.password, (isMatched) => {
            if(isMatched) {
                const token = jsonwebtoken.sign({'data' : user}, config.secret, {expiresIn : 604800});
                let response = res.json({
                    'success' : true,
                    'message' : 'Login successfully',
                    'token' : 'Bearer '+token,
                    'user' : {
                        'id' : user._id,
                        'name' : user.firstName+ ' '+user.lastName,                        
                        'username' : user.username,
                        'admin' : user.admin
                    }
                });
                return response;
            } else {
                return res.json({'success' : false, 'message' : 'username or password wrong'});
            }
        });
    });
});

//profile api
router.get('/profile', passport.authenticate('jwt', {'session' : false}), (req, res, next) => {
    res.json({'user' : req.user});
});

//Get user details by id
router.post('/getUserById', passport.authenticate('jwt', {'session' : false}), (req, res, next) => {    
    //check if user is admin    
    if(req.user.admin === 'false') {        
        return res.json({'success' : false, msg : 'Do not have access to this api'});
    }

    User.getUserById(req.body.userId, (err, user) => {
        if(err) {
            console.log(err);
            return res.json({'success' : false, msg : 'Error'});
        }
        res.json({'success' : true, msg : 'success', 'name' : user.firstName +' '+user.lastName});
    });    
});

//Get all non admin users
router.get('/getNonAdminUsers', passport.authenticate('jwt', {'session' : false}), (req, res, next) => {
    //check if user is admin    
    if(req.user.admin === 'false') {        
        return res.json({'success' : false, msg : 'Do not have access to this api'});
    }

    User.getAllNonAdminUser((err, users) => {
        if(err) {
            console.log(err);
            return res.json({'success' : false, msg : 'Error'});
        }
        res.json({'success' : true, msg : 'success', 'users' : users});
    });    
});

module.exports = router;