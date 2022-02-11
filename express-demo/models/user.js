const Joi = require('joi');
const mongoose = require('mongoose');

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
    }
});

const User = mongoose.model('User', userSchema);

function validateUser(user){
    schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(50).required().email(),
        pwd: Joi.string().min(5).max(1024).required()
    });

    return schema.validate(user);
}

module.exports.validate = validateUser;
module.exports.User = User;
module.exports.userSchema = userSchema;