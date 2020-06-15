const express = require('express')
require('./db/mongoose');
const Courses = require('./models/courses');
const path = require('path')
const hbs = require('hbs')
const course_list = require('./utils/course_list');
//const passing = require('./utils/test.js');

//const getData = require('./utils/test.js')
//------------
const request = require('request');
const cheerio = require('cheerio');

// Install node-fetch before running the code using the command- "npm install --save node-fetch"
const fetch = require('node-fetch')
//-------------




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


var url_list=["https://www.udemy.com/course/react-the-complete-guide-incl-redux/",
              "https://www.udemy.com/course/mongodb-the-complete-developers-guide/",
              "https://www.udemy.com/course/ios-13-app-development-bootcamp/",
              "https://www.udemy.com/course/the-complete-react-native-and-redux-course/",
              "https://www.udemy.com/course/the-web-developer-bootcamp/",
              "https://www.udemy.com/course/creativity-and-innovation-for-business/"]





app.get('',(req,res,next) =>{
  async function my_detail(html,url){
      try{
          const $ = await cheerio.load(html);
          const siteHeading = $('.row');

          const output = siteHeading.find('h1').text().replace("\n",'');

          const image = $('.introduction-asset img').attr('src')
          // console.log(image)
          // console.log(output)


          const details={
          img:image,
          name:output,
          link:url
          }
          return await details
      }catch(e){
          console.log("ERROR: Could not parse")
          return null
      }
  }
getDataFromURL(url_list)
async function getDataFromURL(url_list){
    var new_l=[]
    // for every link. fetch the data, get the html response and pass it to my_detail function to get name and img
    url_list.forEach(url=>{
        fetch(url)
        .then(res=> res.text())
        .then(html=>my_detail(html,url))
        .then(detail=>new_l.push(detail))

    })

    setTimeout(function(){
        p={courses:new_l}
        res.render('index',p)
        console.log(p)
    },4000)
}

    //res.render('index',course_list)

})

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


app.get('/additional_course', async (req,res,next) =>{

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
