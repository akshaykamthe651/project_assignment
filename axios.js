axios.all([
    axios.get('http://localhost:3000/hotels'),
    axios.get('http://localhost:7000/hotels')
        ])
        
        .then(responseArr => {
            console.log("firstAPI data",responseArr[0].data);
            console.log("secondAPI data",responseArr[1].data);
            firstResult=responseArr[0].data
            secondResult=responseArr[1].data
            console.log("finalArray"+allData);
        })
        .catch(err => { 
            console.log(err,err.response);
        });
        

// axios.put('http://localhost:3000/hotels',{
//         id : 1,
//         availability : 5
//     })
//     .then(responseArr=> console.log(responseArr)) 
//     .catch(err =>console.log(err))

   
   

