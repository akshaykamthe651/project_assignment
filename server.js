const express = require('express');
const bodyParser = require('body-parser');
var fs = require("fs");
var Request = require("request");
var url = require('url');
var _ = require("underscore");
const { response } = require('express');
var firstResult;
var secondResult;
var allData;
const app = express();
const axios = require('axios').default;


app.use(bodyParser.urlencoded({ extended: true }));
app.listen(8080, () => console.log(`Started server at http://localhost:8080`)); 

//Initial API call to get data from Both sources

app.get("/hotels", (req, resp) => {
    var test
    Request.get("http://localhost:7000/hotels", (error, response, body) => {
        if (!error && response.statusCode == 200)
            firstResult = JSON.parse(body);
        console.dir(JSON.parse(body));
        callfunction();                         //call for 2nd REST API
    });
    function callfunction() {

        Request.get("http://localhost:3000/hotels", (error, response, body) => {
            if (!error && response.statusCode == 200)

                secondResult = JSON.parse(body);
            console.dir(secondResult);
            console.dir(JSON.parse(body));
            allData = firstResult.concat(secondResult);   //concated data from 2 API'S

            fs.writeFile('demo.json', JSON.stringify(allData), function (err) {
                if (err) throw err;                        //Write operation on combined data from 2 API'S                        
            });
        });
    }

    fs.readFile('demo.json', 'utf8', (err, data) => {
        //Reading data from main source
        if (err) {
            console.error(err)
            return
        }
        allData = data
        resp.send(allData)
    });

});

    
// Filter Condition on roomType and availiability
app.get("/hotels/:roomType", (req, res) => {

    var roomType = req.params.roomType;
    fs.readFile('demo.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }

        allData = JSON.parse(data);

        myArray = allData.filter(allData =>          //filter function condition on  roomType & Availability
            (allData.roomType == roomType && allData.availability > 0));

        res.send(myArray);
    })
});


//Filter on searchBy hotel Name 
app.get("/searchByName/:name", (req, res) => {

    var hotelName = req.params.name;
    fs.readFile('demo.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        allData = JSON.parse(data);
                
    myArray = allData.filter(allData =>     //filter condition on  ByHotelname
        (allData.name == hotelName));
    console.log(myArray);
    res.send(myArray);
    })
});


//Filter on price range of Hotel

app.get("/hotelsRoomCharge/:charges", (req, res) => {

    var Charges = req.params.charges;

    fs.readFile('demo.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        allData = JSON.parse(data);
                  
    myArray = allData.filter(allData =>          //filter function condition on  Hotel charges range
        (allData.charges <= Charges || Charges == allData.charges));

    res.send(myArray);

    })
});

