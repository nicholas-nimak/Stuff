// let server = require("./server");
// server.create();

const http = require('http');
const fs = require('fs');

let server = http.createServer((request, response) => {
  let url = require('url').parse(request.url);
  let filename = url.pathname.substring(1) || 'index.html';
  let css = filename.substring(filename.lastIndexOf('.') + 1);
  fs.readFile(filename, (err, content) => {
    if(err) {
      console.log(err);
    } else if(css === 'css') {
      response.writeHead(200, {'Content-Type': 'text/css'});
      response.write(content);
      response.end();
    } else {
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write(content);
      response.end();
    };
  });
}).listen(3000, console.log("server started"));

/////////////////////////
