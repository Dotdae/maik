const mongoose = require('mongoose');

const { Schema } = mongoose;

const ListCourseSchema = new Schema({

    name: {type: String, required: true},
    horario: {type: String, required: true},
    aula: {type: String, required: true},
    profesor: {type: String, required: true},

});

module.exports = mongoose.model('ListCourse', ListCourseSchema);