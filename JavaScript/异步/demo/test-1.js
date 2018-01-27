const f1 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // reject(111);
            resolve('zx data');
        }, 2000);
    });
};

const f2 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(222);
        }, 3000);
    });
};
var t1 = 0;
const testAsync = async () => {
    console.log('async in')
    // try {
        t1 = await f1();
        console.log(t1);
        return t1;
        // const t2 = await f2();
        // console.log(t2);
    // } catch (err) {
    //     console.log(err);
    // }
    // return 3;
};

testAsync()
    .then(
        (data) => {
            console.log('data:', data);  // async 里return 才会有data!
        })
    .catch(
        (err) => {
            // 这里因为上面async里加了catch, 所以这不能捕捉以！
            console.log('err:', err)
        });
console.log(t1)