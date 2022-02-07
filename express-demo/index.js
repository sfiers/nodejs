const express = require('express');
const Joi = require('joi');
const logger = require('./logger');

const app = express();

app.use(express.json()); // parse incomming json and populate req.body
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'))

app.use((req, res, next) => {
    console.log("Logging...");
    next();
});

app.use(logger);

const genres = [
    { id: 1, name: 'Action' },  
    { id: 2, name: 'Horror' },  
    { id: 3, name: 'Romance' }
]

app.get('/api/genres', (req, res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));

    // 404 resource not found
    if(!genre) return res.status(404).send('The genre with the given id was not found');

    // genre is found
    res.send(genre);
})

app.post('/api/genres', (req, res) => {

    const {error} = validateGenre(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
})

app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));

    // 404 resource not found
    if(!genre) return res.status(404).send('The genre with the given id was not found');
    
    const {error} = validateGenre(req.body)

    if(error) return res.status(400).send(error.details[0].message);
    
    genre.name = req.body.name;
    // send back updated genre
    res.send(genre);

})

app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given id was not found');

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
})

function validateGenre(genre){
    schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(genre);
}

const port = (process.env.PORT || 3000);

app.listen(port, () => `Listening on port ${3000}...`);