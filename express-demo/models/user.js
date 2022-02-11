const Joi = require('joi');
const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');
const { boolean } = require('joi');

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    pwd: {
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: {
        type: Boolean, 
        default: true
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({
        _id: this._id,
        name: this.name,
        email: this.email,
        isAdmin: this.isAdmin
    }, config.get('jwtPrivateKey'));
    
    return token;
}

const User = mongoose.model('User', userSchema);

function validateRegister(user){
    schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(50).required().email(),
        pwd: Joi.string().min(5).max(1024).required(),
        isAdmin: Joi.boolean()
    });

    return schema.validate(user);
}

function validateLogin(user){
    schema = Joi.object({
        email: Joi.string().min(5).max(50).required().email(),
        pwd: Joi.string().min(5).max(1024).required(),
        isAdmin: Joi.boolean()
    });

    return schema.validate(user);
}

module.exports.validateRegister = validateRegister;
module.exports.validateLogin = validateLogin;
module.exports.User = User;
module.exports.userSchema = userSchema;