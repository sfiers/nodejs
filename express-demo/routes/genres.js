const express = require('express');
const router = express.Router();
const { validate, Genre } = require('../models/genre');

router.get('', async (req, res) => {
    const genres = await Genre.find()
    res.send(genres);
});

router.get('/:id', async (req, res) => {
    // const genre = genres.find(c => c.id === parseInt(req.params.id));
    const genre = await Genre.findById(req.params.id)

    // 404 resource not found
    if(!genre) return res.status(404).send('The genre with the given id was not found');

    // genre is found
    res.send(genre);
})

router.post('', async (req, res) => {

    const {error} = validate(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const genre = new Genre({
        name: req.body.name
    });
    await genre.save();
    res.send(genre);
})

router.put('/:id', async (req, res) => {

    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name}, { new: true})
    // const genre = genres.find(c => c.id === parseInt(req.params.id));

    // 404 resource not found
    if(!genre) return res.status(404).send('The genre with the given id was not found');
    
    
    // genre.name = req.body.name;
    // send back updated genre
    res.send(genre);

})

router.delete('/:id', async (req, res) => {
    // const genre = genres.find(c => c.id === parseInt(req.params.id));
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send('The genre with the given id was not found');

    // const index = genres.indexOf(genre);
    // genres.splice(index, 1);

    res.send(genre);
})



module.exports = router;