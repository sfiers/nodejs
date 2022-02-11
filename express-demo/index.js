const express = require('express');
const mongoose = require('mongoose');

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const logger = require('./middleware/logger');

const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const auth = require('./routes/auth');
const {login, register} = require('./routes/users')
const { string, date } = require('joi');

mongoose.connect('mongodb+srv://Simon:admin@cluster0.sk3na.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));



const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() {
            return this.isPublished;
        }
    }
})

// To create a class Course we need to compile the schema courseSchema into a model
// 'Course' is the singular name of the database collection name 'Courses'
// create a class course that will be saved in the Coure(s) collection following the courseSchema
const Course = mongoose.model('Course', courseSchema);


async function createCourse(){
    const course = new Course({
        name: 'Angular course',
        author: 'Mosh',
        tags: ['Angular', 'frontend'],
        isPublished: true,
        price: 15
    })
    
    try {
        const result = await course.save();
        console.log(result);
    }
    catch(ex){
        console.log(ex.message);
    }
}

async function getCourses(){
    const courses = await Course
        .find({name: 'Node.js course', author: 'Mosh'});
    console.log(courses);
}

// createCourse();

async function createGenre(name){
    const genre = new Genre({
        name: name
    })

    try {
        const result = await genre.save();
    }
    catch(ex) {
        console.log(ex.message);
    }
}

// createGenre('Action');
// createGenre('Horror');
// createGenre('Romance');


// Built-in middleware

app.use(express.json()); // parse incomming json and populate req.body
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'))

app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api', login);
app.use('/api', register);
app.use('/api/auth', auth);


// custom middleware 

app.use(logger);

const port = (process.env.PORT || 3000);

app.listen(port, () => console.log(`Listening on port ${3000}...`));