const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false
    },
    name: {
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 50
    },
    phone: {
        type: String, 
        required: false,
        minlength: 5,
        maxlength: 50
    }
})

const Customer = mongoose.model('customer', customerSchema);

function validateCustomer(customer){
    schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean()
    });

    return schema.validate(customer);
}

module.exports.validate = validateCustomer;
module.exports.Customer = Customer;