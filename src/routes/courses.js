const router = require('express').Router();
const Course = require('../models/Course');
const ListCourse = require('../models/ListCourse');
const { isAuthenticated } = require('../helpers/auth');

// See courses.

router.get('/courses', isAuthenticated, async (req, res) => {

    const cursos = await ListCourse.find();

    if(cursos){


        res.render('courses', {title: "Perfil", cursos});
    
    }

});

// Add course to profile.

router.post('/courses/add', isAuthenticated, async (req, res) => {

    // Destructuración de la respuesta.

    const { curso_name, curso_horario, curso_aula, curso_profesor} = req.body;

    // Bind params to DB.

    const newCourse = new Course({curso_name, curso_horario, curso_aula, curso_profesor});

    // Save in DB.

    newCourse.user = req.user.id;

    await newCourse.save();

    res.redirect('/profile');

});

// Delete course in profile.

router.delete('/profile/delete/:id', isAuthenticated, async (req, res) =>{

    await Course.findByIdAndDelete(req.params.id);

    res.redirect('/profile');

});

router.get('/profile', isAuthenticated, async (req, res) => {

    const cursos = await Course.find({user: req.user.id});


    if(cursos){

        res.render('profile', {title: "Perfil", cursos: cursos});
    
    }
    

});

// Courses CRUD.

router.get('/create', isAuthenticated, async(req, res) =>{

    res.render('createCourse', {title: "Añadir curso"});

})

// Create the course.

router.post('/course/create', isAuthenticated, async (req, res) =>{

    // Destructuración de la respuesta.

    const { name, horario, aula, profesor} = req.body;

    // Bind params to DB.

    const newListCourse = new ListCourse({name, horario, aula, profesor});

    // Save in DB.

    await newListCourse.save();


    res.redirect('/courses');

});

// Delete course.

router.delete('/courses/delete/:id', isAuthenticated, async (req, res) =>{

    await ListCourse.findByIdAndDelete(req.params.id);

    res.redirect('/courses');

});

// Edit course.

router.get('/courses/edit/:id', isAuthenticated, async (req, res) =>{

    const course = await ListCourse.findById(req.params.id);

    console.log(course);

    res.render('editCourse', {title: 'Editar curso', course});

});

router.put('/courses/update/:id', isAuthenticated, async (req, res) =>{

    const { name, horario, aula, profesor} = req.body;

    await ListCourse.findByIdAndUpdate(req.params.id, {name, horario, aula, profesor});

    res.redirect('/courses');

});


module.exports = router;