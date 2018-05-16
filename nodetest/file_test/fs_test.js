'use strict';

var fs = require('fs');

// 打开一个流:
var rs = fs.createReadStream('./nodetest/sample.txt', 'utf-8');

rs.on('data', function (chunk) {
    console.log('DATA:')
    console.log(chunk);
});

rs.on('end', function () {
    console.log('END');
});

rs.on('error', function (err) {
    console.log('ERROR: ' + err);
});



var fs = require('fs');

var ws1 = fs.createWriteStream('./nodetest/output1.txt', 'utf-8');
ws1.write('使用Stream写入文本数据...\n');
ws1.write('END.');
ws1.end();

var ws2 = fs.createWriteStream('./nodetest/output2.txt');
ws2.write(new Buffer('使用Stream写入二进制数据...\n', 'utf-8'));
ws2.write(new Buffer('END.', 'utf-8'));
ws2.end()


var fs = require('fs');

var rs = fs.createReadStream('./nodetest/sample.txt');
var ws = fs.createWriteStream('./nodetest/copied.txt');

rs.pipe(ws);



var rs = fs.createReadStream('./nodetest/sample.txt', 'utf-8');

rs.on('data', function (chunk) {
    console.log('DATA1:')
    console.log(chunk);
});


rs.on('data', function (chunk) {
    console.log('DATA2:')
    console.log(chunk);
});
