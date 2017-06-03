// let createServ = () => {
//   return new Promise((resolve) => {
//     require('http').createServer(  (request, response) => {
//         res.writeHeader(200, {'Content-Type': 'text/html'});
//         response.write("hello");
//         response.end();
//       }).listen(8888, () => {
//         console.log("server started");
//       });
//     resolve();
//   });
// };
// createServ().then(() => {
//   console.log("hello2");
// });
///////////////////
const http = require('http');
const fs = require('fs');
let create = () => {
  http.createServer((req, res) => {
    let readSomeFile = () => {
      return new Promise(resolve => {
        fs.readFile('./index.html', 'utf8', (err, html) => {
          if(err) {throw err} else {resolve(html)};
        });
      });
    };
    readSomeFile().then((content) => {
      res.writeHeader(200, {'Content-Type': 'text/html'});
      res.write(content);
      res.end();
    });
  }).listen(3000, console.log('server started'));

  // fs.readFile('./index.html', 'utf8', (error, html) => {
  //   if(error) {
  //     throw new error;
  //   };
  //   http.createServer((req, res) => {
  //     console.log('request received');
  //     res.writeHead(200, {'Content-Type': 'text/html'});
  //     res.write(html);
  //     res.end();
  //     console.log('response sent');
  //   }).listen(3000, console.log('server started'));
  // });
};
create();
// exports.create = create;
