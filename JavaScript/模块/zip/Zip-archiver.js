/**
 * arichiver ZIP
 * 
 * 压缩：
 */
var fs = require('fs');
var archiver = require('archiver');

var output = fs.createWriteStream('archiver-unzip.zip');
var archive = archiver('zip');

archive.on('error', function(err){
    throw err;
});

archive.pipe(output);
archive.bulk([
    { src: ['archiver/**']}
]);
archive.finalize();
// 解压：

var fs = require("fs");
var unzip = require("unzip");

fs.createReadStream('archiver-unzip.zip').pipe(unzip.Extract({ path: 'unarchive' }));