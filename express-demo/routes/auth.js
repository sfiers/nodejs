const bcrypt = require('bcrypt');

const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const _ = require('lodash');

const { User } = require('../models/user');

router.post('', async (req, res) => {
    const { error } = validate(req.body);
    if ( error ) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Invalid email or Password.')

    const validPwd = await bcrypt.compare(req.body.pwd, user.pwd)
    if (!validPwd) return res.status(400).send('Invalid email or Password.')

    const token = user.generateAuthToken();

    res.send(token);
    
})

function validate(user){
    schema = Joi.object({
        email: Joi.string().min(5).max(50).required().email(),
        pwd: Joi.string().min(5).max(1024).required()
    });

    return schema.validate(user);
}

module.exports = router;