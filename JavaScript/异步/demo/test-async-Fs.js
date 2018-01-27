var fs = require('fs'),
    tmp = 2;

async function test(file) {
    tmp = await new Promise(
        (resolve, reject) => {
            fs.readFile(
                file,
                (err, data) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(data)
                })
        })
    var a = 1;
}

var fsData = test('test.txt')
console.log('files:',tmp)
//     .then(
//     (data) => {
//         console.log('file contion :', data)
//     },
//     (err) => {
//         console.log(err)
//     }
// )
