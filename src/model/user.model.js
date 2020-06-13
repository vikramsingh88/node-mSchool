const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName : {type : String, required : true},
    lastName : {type : String, required : true},
    username : {type : String, required : true},
    password : {type : String, required : true},
    admin : {type : String, required : true},
    date: { type: Date, default: Date.now }
})

const User = mongoose.model('User', userSchema)

module.exports = User

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback) {
    const query = {'username' : username};
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) {
                throw err;
            }
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function(password, savePassword, callback) {
    bcrypt.compare(password, savePassword, (err, isMatched) => {
        if(err) throw err;
        callback(isMatched);
    })
}

//Get all non admin user
module.exports.getAllNonAdminUser = function(callback) {
    const query = {'admin' : 'false'};
    User.find(query, callback);
}