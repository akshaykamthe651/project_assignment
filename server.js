const express = require('express');
const bodyParser = require('body-parser');
var fs=require("fs");
var Request = require("request");
var url=require('url');
//const { response } = require('express');
var _ = require("underscore");
var firstresult;
const app = express();
var allData;


app.use(bodyParser.urlencoded({ extended: true }));
app.listen(8080, () => console.log(`Started server at http://localhost:8080`));


app.get("/hotels",(req,resp)=>{
    var test
    Request.get("http://localhost:7000/hotels", (error, response, body) => {
        if (!error && response.statusCode == 200)
    fs.writeFileSync('demo.json', body);
    firstresult= JSON.parse(body);
    console.dir(JSON.parse(body));
    callfunction(); //call for 2nd REST API
    
});
function callfunction()
{
    console.log("hii");
    Request.get("http://localhost:3000/hotels", (error, response, body) => {
        if (!error && response.statusCode == 200)
    console.log("body"+body)
    console.log("in 2nd api call")
    var json = JSON.parse(body)
    firstresult.push(json)
   
    fs.writeFile('demo.json', JSON.stringify(firstresult),function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
});
}

fs.readFile('demo.json', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
     console.log('reading from file');
    // console.log(data);
   // test = data
   allData=data
    console.log("************");
    console.log("Test file"+allData);
    console.log("************");
    resp.send(allData)
  });

  });

  //Filter Condition on roomType and availiability
  app.get("/hotels/:roomType",(req,res)=>{

    console.log("inside roomType");
	var roomType=req.params.roomType;
    console.log(roomType);
    
    fs.readFile('demo.json', 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
          return
        } 
       console.log(data);
       allData=JSON.parse(data)
        console.log(allData);                  //filter function condition on  roomType & Availability
myArray = allData.filter(allData =>                         
    (allData.roomType==roomType && allData.availability>0 ) ); 
console.log(myArray);                                          
res.send(myArray);

});
    })
    
	

  