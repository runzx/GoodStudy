var fs = require('fs')

fs.readFile('test.txt', (err, data) => {
    if (err){
        console.error(err)
    }
    console.log('read data:',data.toString())
})
