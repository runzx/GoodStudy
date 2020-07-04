console.log('start');

function test() {
    console.log('111');

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('finish')
            resolve('data1');
        }, 2000)
    })
    // 下面是没用的
    console.log('start promise2')

    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('finish2')
            resolve(() => {
                // return 'zx test'
                console.log('zx test')
            });
        }, 1000)
    })
    return 'zx';
}

console.log('middi');
test().then(
    (data) => {
        // resolve(data)
        console.log('hi-?');
        console.log(data)
        if (typeof data === 'function') {
            data();
        }
    },
    (err) => {
        // reject(err)
    }
)

console.log('end');