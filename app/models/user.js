var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs'); 
var titlize = require('mongoose-title-case'); 
var validate = require('mongoose-validator');

// User E-mail Validator
var emailValidator = [
    validate({
        validator: 'matches',
        arguments: /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/,
        message: 'Email format is incorrect'
    })
];

// User Mongoose Schema
var UserSchema = new Schema({
    firstName:{type:String,required:true},
    lastName:{type:String, required:true},
    email: { type: String, required: true },
    // password: { type: String, required: true},
    role: { type: String, required: true, default: 'user'}
});


// UserSchema.pre('save', function(next) {
//     var user = this;

//     if (!user.isModified('password')) return next(); 
 
//     bcrypt.hash(user.password, null, null, function(err, hash) {
//         if (err) return next(err); 
//         user.password = hash;
//         next(); 
//     });
// });

// UserSchema.plugin(titlize, {
//     paths: ['name']
// });

// UserSchema.methods.comparePassword = function(password, userPassword) {
//     return bcrypt.compareSync(password, this.password); 
// };

module.exports = mongoose.model('User', UserSchema); 