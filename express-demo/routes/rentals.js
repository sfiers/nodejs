const express = require('express');
const router = express.Router();
const { validate, Rental } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
// const mongoose = require('mongoose');
// const Fawn = require('fawn');


// Fawn.init(mongoose);

router.get('', async (req, res) => {
    const rentals = await Rental.find()
    res.send(rentals);
});

router.post('', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send(`Invalid movie.`);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send(`Invalid customer.`);

    if (movie.numberInStock === 0) return res.status(400).send(`The movie ${movie.title} is not in stock.`);


    const rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    })
// db will be inconcsistant if a problem occurs between two commits 
    await rental.save();
    res.send(rental);
    
    movie.numberInStock--;
    movie.save();

// Two fase commit using fawn

    // try {
    //     new Fawn.Task()
    //         .save('rentals', rental)
    //         .update('movies', {_id: movieId}, {inc: {numberInStock: -1}})
    //         .run
    //     res.send(rental);
    // }
    // catch(ex) {
    //     res.status(500).send('An unexpected issue occured.')
    // }

});

module.exports = router;