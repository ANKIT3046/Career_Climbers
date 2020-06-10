const express = require('express')
const path = require('path')
const hbs = require('hbs')
const course_list = require('./utils/course_list');
const app = express()

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);
 // Static Directory to serve

 app.use(express.static(publicDirectoryPath));



 app.get('',(req,res,next) =>{
   res.render('index',course_list)
 })

app.listen(3000, () =>{
  console.log('Serever is running on port 3000');
})
