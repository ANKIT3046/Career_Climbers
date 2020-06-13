const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

// Install node-fetch before running the code using the command- "npm install --save node-fetch"
const fetch = require('node-fetch')




//var url="https://www.udemy.com/course/insiders-guide-to-helpdesk-desktop-server-support/"
var url_list=["https://www.udemy.com/course/react-the-complete-guide-incl-redux/",
              "https://www.udemy.com/course/mongodb-the-complete-developers-guide/",
              "https://www.udemy.com/course/ios-13-app-development-bootcamp/",
              "https://www.udemy.com/course/the-complete-react-native-and-redux-course/",
              "https://www.udemy.com/course/the-web-developer-bootcamp/",
              "https://www.udemy.com/course/creativity-and-innovation-for-business/"]




// This function performs the main task

async function getDataFromURL(url_list){
  var new_l=[]
    // for every link. fetch the data, get the html response and pass it to my_detail function to get name and img
    url_list.forEach(url=>{
        fetch(url)
        .then(res=> res.text())
        .then(html=>my_detail(html,url))
        .then(detail=>new_l.push(detail))

    })
    return await new_l
}




// To test if the new_l list is getting updated or not

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
// setTimeout(function(){
//   module.exports = new_l;
//
// },4000)
 module.exports={getDataFromURL}
