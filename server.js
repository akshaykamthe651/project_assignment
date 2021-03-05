const express = require('express');
const bodyParser = require('body-parser');
var fs = require("fs");
var Request = require("request");
var url = require('url');
var _ = require("underscore");
const { response } = require('express');
var firstParamter;
var secondParamter;
var allData;

const app = express();
const axios = require('axios');
const { json } = require('body-parser');

var one="http://localhost:3000/hotels";
var two="http://localhost:7000/hotels";

app.use(bodyParser.urlencoded({ extended: true }));
app.listen(8080, () => console.log(`Started server at http://localhost:8080`));

//Initial API call to get data from Both sources

app.get("/hotels", (req, resp) => {

    if (req.query.roomType === undefined) {
    const requestOne=axios.get(one);
    const requestTwo=axios.get(two);

    console.log(req.query.roomType);

    axios.all([requestOne, requestTwo])
        .then(axios.spread((...responses) => {
         responseOne =responses[0].data;
         responseTwo = responses[1].data;

         allData = responseOne.concat(responseTwo);
         console.log("finalArray" + allData);
         resp.send(allData);
         }))
        .catch(err => {
                console.log(err, err.response);
            });

    }
    else if (req.query.roomType && req.query.roomType) {
        console.log("inside room filter");
        
        console.log(firstParamter = req.query.roomType[0]);
        console.log(secondParamter = req.query.roomType[1]);

        const requestOne=axios.get(one);
        const requestTwo=axios.get(two);  
    
        axios.all([requestOne, requestTwo])
            .then(axios.spread((...responses) => {
             responseOne =responses[0].data;
             responseTwo = responses[1].data;
    
             allData = responseOne.concat(responseTwo); //filter function condition on  roomType & Availability
             console.log("finalArray" +(JSON.stringify(allData)));
            var roomSource =allData.filter(allData => (allData.roomType == firstParamter && allData.roomType == secondParamter));
            console.log("*******"+roomSource+"filtered data");
             resp.send(roomSource);
             }))
                // console.log("finalArray" + JSON.stringify(allData));
                // dataForFilter=JSON.parse(allData)
               
            .catch(err => {
                console.log(err, err.response);
            });

        }
    });
    //     else if(req.query.charges!=={})
    //     {
    //         console.log("inside charges And roomType Filter");
    //         console.log(firstParamter = req.query.charges);
    //         console.log(secondParameter=req.query.roomType);
           
    //         resp.send("3rd api");
    //     }
        
    // });

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

