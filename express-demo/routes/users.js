const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const auth = require('../middleware/auth')

const { User, validateRegister, validateLogin } = require('../models/user');

const me = router.get('/me', auth, async (req, res, next) => {
    const user = await User.findById(req.user._id).select('-pwd');
    res.send(user);
})

const register = router.post('/users', async (req, res) => {
    const { error } = validateRegister(req.body);
    if ( error ) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send('Already an account registered with this email')

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.pwd, salt);

    user = new User({
        name: req.body.name,
        email: req.body.email,
        pwd: hash
    })

    await user.save();

// send everything back including password
    // res.send(user);

// exclude password in response

    // res.send({
    //     name: user.name,
    //     email: user.email
    // })

// Add jwt so that user is automatically logged in after registration
// pick properties using lodash npm package

    const token = user.generateAuthToken();

    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']))
    
})

module.exports.register = register;
module.exports.me = me;