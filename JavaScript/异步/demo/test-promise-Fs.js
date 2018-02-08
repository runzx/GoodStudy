var fs = require('fs')

function test(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) {
                reject(err)
            }
            resolve(data)
        })
    })
}

test('test.t1xt').then(
    (data) => {
        console.log('file contion :', data)
    },
    (err) => {
        console.log(err)
    }
)
