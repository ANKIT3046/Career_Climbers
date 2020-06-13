const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');


var list=[]

//var url="https://www.udemy.com/course/insiders-guide-to-helpdesk-desktop-server-support/"
var url_list=["https://www.udemy.com/course/react-the-complete-guide-incl-redux/",
              "https://www.udemy.com/course/mongodb-the-complete-developers-guide/",
              "https://www.udemy.com/course/ios-13-app-development-bootcamp/",
              "https://www.udemy.com/course/the-complete-react-native-and-redux-course/",
              "https://www.udemy.com/course/the-web-developer-bootcamp/",
              "https://www.udemy.com/course/creativity-and-innovation-for-business/"]

var new_l=[]
function my_detail(new_l,url_list,callback) {

  for (var i=0,l=url_list.length;i<l;i++){

  request(url_list[i],(err, resp, html) =>{
    if (!err && resp.statusCode == 200){
      const $ = cheerio.load(html);
      const siteHeading = $('.row');

      const output = siteHeading.find('h1').text();


      image = $('.introduction-asset img').attr('src')
      console.log(image)
      console.log(output)

       var details=({
        img:image,
        name:output
      })
    }
    new_l.push(details)

  })
}
return new_l
}
my_detail(new_l,url_list,function(response){
  console.log(new_l)
})
