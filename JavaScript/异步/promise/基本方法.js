

1. 最基本的回调函数方式
        var fs = require("fs")

        fs.readFile('input.txt', function (err, data) {
            if (err) {
                console.error(err)
            }
            console.log("read data:", data.toString());
        })

    // 改写为Promise模式：
        var fs = require("fs")

        var readFile = function (file) {
            // 定义一个 Promise对象
            // 参数是一个方法，方法需要两个参数
            return new Promise(function (resolve, reject) {
                fs.readFile(file, function (err, data) {
                    if (err) {
                        reject(err) // 错误时执行reject方法
                    }
                    resolve(data) // 执行resolve方法
                });
            })
        }

        // 获取Promise对象并且执行then方法
        // then方法需要两个方法作为参数
        readFile('input.txt')
            .then(
                data => {   // resolve 方法
                    console.log("promise read data:", data.toString())
                }, 
                err => {    // reject 方法
                    console.error(err)
                }
            )
        /**
         * Promise的构造方法入参是一个方法，这个方法传入两个参数：resolve和reject。根据约定，
                当程序执行正常，方法resolve被执行；
                当程序出现异常，方法reject被执行。
            then 方法中的两个参数分别就是和Promise中传入的方法的两个参数相对应的。
         */
    Promise的三个接口:
        Promise.prototype.constructor
            构造函数，Promise构造的时候决定了何时调用成功回调resolve，
                何时调用失败回调reject。
        Promise.prototype.then(onFulfilled, onRejected)
        业务可以通过then接口传给Promise成功或者失败后的处理逻辑。
            Promise成功会调用resolve，resolve会调用onFulfilled，
        Promise.prototype.catch(onRejected)
            Promise失败会调用reject，reject会调用onRejected


        // async方法: promise定义同上
        var test = async (file) => {
            try {
                var data = await readFile(file) // 这里把resolve的入参返回给data
                console.log('async and await:', data.toString())
            } catch (err) {
                console.error(err)
            }
        }
        test('input.txt')
        /**
        方法内使用await关键字修饰了一个Promise对象，这个修饰符将会把resolve对象执行时的入参返回
        在async方法中reject方法一旦执行就会触发异常，所以我们用 try catch 包裹了代码快，
            catch的参数就是reject方法执行时候的入参。 

         * 
         */
        await 是个运算符，用于组成表达式，await 表达式的运算结果取决于它等的东西。
            如果它等到的是一个 Promise 对象，等 Promise 对象 resolve，
                然后得到 resolve 的值，作为 await 表达式的运算结果。
        sync 函数调用不会造成阻塞，它内部所有的阻塞都被封装在一个 Promise 对象中异步执行。

        例：回调方式 callback hell
            function callbackhell() {
                var result = '';
                asyncGetData((data) => {
                result += data + "_";
                asyncGetData((data) => {
                    result += data + "_";
                    asyncGetData((data) => {
                    result += data + "_";
                    asyncGetData((data) => {
                        result += data + "_";
                        asyncGetData((data) => {
                        result += data + "_";
                        console.log(result);
                        })
                    })
                    })
                })
                })
            }
        改async方式 ：
            // promise
            function promiseGetData() {
                return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve('data');
                    // or reject
                }, 3000);
                });
            }
 
            async function asyncGetFiveData() {
                var result = '';
                var data1 = await promiseGetData();
                result += data1 + '_';
                data2 = await promiseGetData();
                result += data2 + '_';
                data3 = await promiseGetData();
                result += data3 + '_';
                data4 = await promiseGetData();
                result += data4 + '_';
                data5 = await promiseGetData();
                result += data5 + '_';
                console.log(result);
            }
            
            // 调用的时候
            asyncGetFiveData();
            
    以下定义是等价的：

        function f() {
            return Promise.resolve('TEST');
        }
        
        // asyncF is equivalent to f!
        async function asyncF() {
            return 'TEST';
        }
        或：
        var asyncF = async () => {
            return 'TEST';
        }
    类似地，抛出异常的Async函数等效于返回reject Promise的函数：
        
        function f() {
            return Promise.reject('Error');
        }
        
        // asyncF is equivalent to f!
        async function asyncF() {
            throw 'Error';
        }
    
    JavaScript解释器知道async函数中的所有操作都将被封装在Promise中并异步运行。
        await关键字。 它只能用于async功能，并允许我们同步等待Promise。 如果我们在async函数之外使用Promise，我们仍然需要使用回调函数：
    Async/await不能取代纯粹Promise的需要。 
        例如，如果我们从正常函数或全局范围调用Async函数，我们将无法使用await，并将诉诸于vanillaPromise：
