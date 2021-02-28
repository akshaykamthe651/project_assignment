// const http=require('http');
// var app=require('./app');

// http.createServer(app.handleRequest).listen(1337, "127.0.0.1", () => {

// console.log('Server running at http://127.0.0.1:1337/');
// });

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//     console.log('Got body:', req.body);
// var data=res.send;
// console.log(data);
//     res.send('hello world');
// });
// app.get();

app.listen(8080, () => console.log(`Started server at http://localhost:8080`));

// const request=require('request')
// request.get("http://localhost:3000/hotels",(error,req,body)=>{

// if(error){
//     return(  console.log("error"))
      
// }
// console.dir(JSON.parse(body));
// })



// var express = require('express');
// var app = express();


// app.get('http://localhost:3000/hotels', function (req, res) {
//    // First read existing users.
 
//       var users = JSON.parse( data );
//       var user = users["user" + req.params.id] 
//       console.log( user );
//       res.end( JSON.stringify(user));
 
// })

// var server = app.listen(8081, function () {
//    var host = server.address().address
//    var port = server.address().port
//    console.log("Example app listening at http://%s:%s", host, port)
// })


var fs=require("fs");
var Request = require("request");

Request.get("http://localhost:3000/hotels", (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    //let data = JSON.stringify(body);
    fs.writeFileSync('demo.json', body);
   // response.status(200).send(result);
    console.dir(JSON.parse(body));
});

fs.readFile('demo.json', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    console.log('reading from file');
    console.log(data);
    var test = require('./demo.json');
    console.log("************");
    console.log(test);
    console.log("************");

    var afterFilter=test.filter((room-type)=> test.room-type =="Large");
 
    console.log("************before filter");
    console.log(afterFilter);
    console.log("************after filter");
  });

Request.get("http://localhost:8000/hotels", (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    console.dir(JSON.parse(body));
});