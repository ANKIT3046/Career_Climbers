const express = require('express')
require('./db/mongoose');
const Courses = require('./models/courses');
const path = require('path')
const hbs = require('hbs')
const course_list = require('./utils/course_list');

//const getData = require('./utils/test.js')



const app = express()

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);
 // Static Directory to serve

 app.use(express.static(publicDirectoryPath));

app.use(express.json())




app.get('',(req,res,next) =>{
    res.render('index',course_list)
})


// this is for posting course of your choice to the database by admin
app.post('/courses', async (req,res) =>{
  // console.log(req.body)
  // res.send('testing')
  const course = new Courses(req.body)

  try {
    await course.save()
    res.send(201).send(course)
  } catch (e){
    res.status(400).send(e)
  }
})

// this is for rendring the course details on page here i use common link which use previeously to store in database
app.get('/courses', async (req,res,next) =>{

  try {
    const course =await Courses.find({})
    //res.send(course)
    //console.log(course)
    let list={cu:course}
    //console.log(abc)
    res.render('additional_course',list)

  } catch (e){
    res.status(500).send()
  }
})

// this for deleting perticuler course from databse by admin 

app.delete('/courses/:id', async (req,res) =>{
  try{
    const course =await Courses.findByIdAndDelete(req.params.id)
    if(!course){
      return res.status(404).send()
    }
    res.send(course)
  } catch (e){
    res.status(500).send(e)
  }
})
//console.log(course_list)
//console.log(new_l)
app.listen(3000, () =>{
  console.log('Serever is running on port 3000');
})
