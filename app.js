const { fstat } = require('fs');
const { request } = require('http');
var url=require('url');
var fs=require('fs');

function renderHTML(path,response){

    fs.readFile(path,null,function(error, data){
        if(error){
            response.writeHead(404);
            response.write('File not found');
        } else{
            response.write(data);
        }
        response.end();
    });
}

module.exports = {
handleRequest: function(request, response){
    response.writeHead(200,{ 'Content-Type':'text/html'});

    var path=url.parse(request.url).pathname;

    switch (path){
        case'/':
            renderHTML('./index.html',response);
            break;
        case '/hotel/room-type':
            renderHTML('./index1.html',response);
        default :
            response.writeHead(404);
            response.write('route not defined');
            response.end();

        }
    }
};