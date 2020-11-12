var http = require('http');
var url = require('url');
var querystring = require('querystring');

//var log = require('./modules/my-log'); //export global
var {info, error} = require("./modules/my-log");
/*import { createServer } from 'http'; nueva forma*/

var {countries} = require('countries-list');

var server = http.createServer(function(request, response){
    var parsed = url.parse(request.url);
    console.log("parsed", parsed);

    var pathName = parsed.pathname;
    var query= querystring.parse(parsed.query);
    console.log("query", query);

    if(pathName==="/"){
        response.writeHead(200,{'Content-Type':'text/html'});
        response.write('<html><body><h1>Hola Mundo</h1></body></html>');
        response.end();
    }else if(pathName==="/exit"){
        response.writeHead(200,{'Content-Type':'text/html'});
        response.write('<html><body><h1>Bye</h1></body></html>');
        response.end();
    }else if(pathName==="/info"){
        var result = info(pathName)
        response.writeHead(200,{'Content-Type':'text/html'});
        response.write(result);
        response.end();
    }else if(pathName==="/error"){
        var result = error(pathName)
        response.writeHead(200,{'Content-Type':'text/html'});
        response.write(result);
        response.end();
    }else if(pathName==="/contry"){
        response.writeHead(200,{'Content-Type':'Application/json'});
        response.write( JSON.stringify(countries[query.code]));
        response.end();
    }else{
        response.writeHead(401,{'Content-Type':'text/html'});
        response.write('<html><body><h1>NO FOUND</h1></body></html>');
        response.end();
    }
});

server.listen(4000);
console.log("running on 4000");