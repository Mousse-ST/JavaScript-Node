'use strict';

const
    fs = require("fs"),
    url = require("url"),
    path = require("path"),
    http = require("http");


const root = path.resolve(process.argv[2] || '.');

console.log("static root dir:" + root);

const fileArr = ['index0.html', 'default.html', 'index.html']

const fnFsStat = function(request, response, filepath, arrIndex){
    arrIndex = arrIndex || 0
    fs.stat(filepath, function(err, states){
        console.log(err + states)
        if (!err && states.isFile()){
            console.log('200 ' + request.url);
            response.writeHead(200);
            fs.createReadStream(filepath).pipe(response);
        } else if (!err && states.isDirectory() || arrIndex != 0 && arrIndex < fileArr.length){
            arrIndex += 1;
            filepath = path.join(root, fileArr[arrIndex - 1]);
            console.log("filepath " + filepath);
            fnFsStat(request, response, filepath, arrIndex)
        } else {
            console.log('no file ' + '404 ' + request.url);
            response.writeHead(404);
            response.end('404 Not Found!');
        }
    });
}

const server = http.createServer(function(request, response){
    let pathname = url.parse(request.url).pathname;
    let filepath = path.join(root, pathname);
    console.log("filepath " + filepath);
    fnFsStat(request, response, filepath, 0);
});

server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');
