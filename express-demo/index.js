const express = require('express');
const Joi = require('joi');

const app = express();

app.use(express.json());

const courses = [
    {id: 1, name: 'course 1'},
    {id: 2, name: 'course 2'},
    {id: 3, name: 'course 3'}
]

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));

    // 404 resource not found
    if(!course) return res.status(404).send('The course with the given id was not found');

    // course is found
    res.send(course);
})

app.post('/api/courses', (req, res) => {

    const {error} = validateCourse(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));

    // 404 resource not found
    if(!course) return res.status(404).send('The course with the given id was not found');
    
    const {error} = validateCourse(req.body)

    if(error) return res.status(400).send(error.details[0].message);
    
    course.name = req.body.name;
    // send back updated course
    res.send(course);

})

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given id was not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
})

function validateCourse(course){
    schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
}

const port = (process.env.PORT || 3000);

app.listen(port, () => `Listening on port ${3000}...`);