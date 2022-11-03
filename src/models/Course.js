const mongoose = require('mongoose');

const { Schema } = mongoose;

const CourseSchema = new Schema({

    curso_name: {type: String, required: true},
    curso_horario: {type: String, required: true},
    curso_aula: {type: String, required: true},
    curso_profesor: {type: String, required: true},
    user: {type: String}

});

module.exports = mongoose.model('Course', CourseSchema);