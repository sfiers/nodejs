const express = require('express');
const router = express.Router();
const { validate, Movie } = require('../models/movie');
const { Genre, genreSchema } = require('../models/genre');

router.get('', async (req, res) => {
    const movies = await Movie.find()
    res.send(movies);
});

router.get('/:id', async (req, res) => {
    // const genre = genres.find(c => c.id === parseInt(req.params.id));
    const movie = await Movie.findById(req.params.id)

    // 404 resource not found
    if(!movie) return res.status(404).send('The movie with the given id was not found');

    // genre is found
    res.send(movie);
})

router.post('', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    console.log(req.body.genreId)
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send(`Invalid genre.`);

    console.log(genre);

    const movie = new Movie({
        title: req.body.title,
        // genre: genre,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })

    await movie.save();
    res.send(movie);
})

router.put('/:id', async (req, res) => {

    // const {error} = validate(req.body)
    // if(error) return res.status(400).send(error.details[0].message);

    const movie = await Movie.findByIdAndUpdate(req.params.id, { title: req.body.title}, { new: true})

    console.log(movie);

    // 404 resource not found
    if(!movie) return res.status(404).send('The movie with the given id was not found');
    
    // send back updated movie
    res.send(movie);

})

router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if (!movie) return res.status(404).send('The movie with the given id was not found');

    // const index = movies.indexOf(movie);
    // movies.splice(index, 1);

    res.send(movie);
})




module.exports = router;