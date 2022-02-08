const express = require('express');
const mongoose = require('mongoose');

const Joi = require('joi');

const logger = require('./middleware/logger');

const app = express();
const genres = require('./routes/genres');
const { string, date } = require('joi');

mongoose.connect('mongodb+srv://Simon:admin@cluster0.sk3na.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
})

// create a class course that will be saved in the Coure(s) collection following the courseSchema
const Course = mongoose.model('Course', courseSchema);


async function createCourse(){
    const course = new Course({
        name: 'Angular course',
        author: 'Mosh',
        tags: ['Angular', 'frontend'],
        isPublished: true
    })
    
    const result = await course.save();
    console.log(result);
}

createCourse();

// Built-in middleware

app.use(express.json()); // parse incomming json and populate req.body
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'))

app.use('/api/genres', genres)

// custom middleware 

app.use(logger);

const port = (process.env.PORT || 3000);

app.listen(port, () => `Listening on port ${3000}...`);