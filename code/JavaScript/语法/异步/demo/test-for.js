var sleep = function (time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            // 返回 ‘ok’
            resolve('ok');
        }, time);
    })
};
let 一到十 = [1,2,3,4,5,6,7,8,9,10]
var start = async function () {
    for (var i = 1; i <= 3; i++) {
        console.log(`当前是第${i}次等待..`);
        var tmp = await sleep(1000);
        console.log(tmp)
    }
    // 正确示范
    for(var v of 一到十) {
        console.log(`当前是第${v}次等待..`);
        await sleep(1000); // 正确, for循环的上下文还在async函数中
    }
    // 错误示范
    /*一到十.forEach(function (v) {
        console.log(`当前是第${v}次等待..`);
        await sleep(1000); // 错误!! await只能在async函数中运行
    });*/
};
start()