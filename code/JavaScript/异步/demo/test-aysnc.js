console.log('start');

async function test() {
    console.log('111');

    await new Promise(
        (resolve, reject) => {
            setTimeout(
                () => {
                    console.log('finish')
                    resolve('haha');
                }, 2000)
        })

    console.log('start promise2')

    return await new Promise(
        (resolve) => {
            setTimeout(
                () => {
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
        console.log('hi-?');
        console.log(data)
        if (typeof data === 'function') {
            data();
        }
    }
)

console.log('end');