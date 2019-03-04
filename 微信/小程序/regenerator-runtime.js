// version="0.10.3"  
  
!(function(global) {  
  "use strict";  
  
  var Op = Object.prototype;  
  var hasOwn = Op.hasOwnProperty;  
  var undefined; // More compressible than void 0.  
  var $Symbol = typeof Symbol === "function" ? Symbol : {};  
  var iteratorSymbol = $Symbol.iterator || "@@iterator";  
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";  
  
  // module存在，runtime添加为module.exports的属性，或者作为module.exports的值，用于模块化加载并导出  
  var inModule = typeof module === "object";  
  var runtime = global.regeneratorRuntime;  
  if (runtime) {  
    if (inModule) {  
      module.exports = runtime;  
    }  
    return;  
  }  
  
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};  
  
  // prototype属性为迭代器的原型，prototype.constructor属性为GeneratorFunctionPrototype构造函数  
  function Generator() {}  
  // prototype属性为GeneratorFunctionPrototype构造函数  
  // displayName属性为"GeneratorFunction"  
  function GeneratorFunction() {}  
  // prototype属性为迭代器的原型，prototype.constructor属性为GeneratorFunctionPrototype构造函数  
  // constructor属性为GeneratorFunction构造函数  
  // [toStringTagSymbol]属性为"GeneratorFunction"  
  function GeneratorFunctionPrototype() {}  
  
  // 迭代器原型prototype属性  
  var IteratorPrototype = {};  
  IteratorPrototype[iteratorSymbol] = function () {  
    return this;  
  };  
  
  var getProto = Object.getPrototypeOf;  
  // NativeIteratorPrototype赋值为原生迭代器的原型prototype属性  
  // values函数将iterable封装成可调用next方法进行迭代取值的迭代器  
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));  
  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && // Object.prototype  
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {  
    IteratorPrototype = NativeIteratorPrototype;  
  }  
  
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);  
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;  
  GeneratorFunctionPrototype.constructor = GeneratorFunction;  
  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";  
  
  // Gp除是迭代器原型外，为其添加next、throw、return方法，方法内部调用_invoke方法  
  // _invoke方法须调用runtime.wrap方法才赋予Gp实例  
  defineIteratorMethods(Gp);  
  
  Gp[toStringTagSymbol] = "Generator";  
  
  Gp.toString = function() {  
    return "[object Generator]";  
  };  
  
  // defineIteratorMethods(prototype)函数为prototype添加next、throw、return方法，方法内部调用_invoke方法  
  function defineIteratorMethods(prototype) {  
    ["next", "throw", "return"].forEach(function(method) {  
      prototype[method] = function(arg) {  
        return this._invoke(method, arg);  
      };  
    });  
  }  
  
  // 判断是否生成器函数  
  runtime.isGeneratorFunction = function(genFun) {  
    var ctor = typeof genFun === "function" && genFun.constructor;  
    return ctor  
      ? ctor === GeneratorFunction || (ctor.displayName || ctor.name) === "GeneratorFunction"  
      : false;  
  };  
  
  // 为编译后的生成器函数提供功能支持  
  // 编译前  
  // function* a() {  
  //   yield 1;  
  // }  
  //  
  // 编译后  
  // var _marked = [a].map(regeneratorRuntime.mark);  
  //  
  // function a() {  
  //   return regeneratorRuntime.wrap(function a$(_context) {  
  //     while (1) {  
  //       switch (_context.prev = _context.next) {  
  //         case 0:  
  //           _context.next = 2;  
  //           return 1;  
  //         case 2:  
  //         case "end":  
  //           return _context.stop();  
  //       }  
  //     }  
  //   }, _marked[0], this);  
  // }  
  
  // 获取迭代器原型对象generator(该对象设定了next、throw、return方法)，添加_invoke方法后返回  
  // 因_invoke方法的添加，next方法执行时将调用innerFn特定条件分支，throw方法报错，return执行完成  
  function wrap(innerFn, outerFn, self, tryLocsList) {  
    // 用户设定的outerFn通过runtime.mark方法封装后，outerFn.prototype instanceof Generator返回真值  
    //    此时outerFn.prototype为迭代器的原型对象Object.create(IteratorPrototype)  
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;  
    var generator = Object.create(protoGenerator.prototype);// 迭代器的原型对象  
    var context = new Context(tryLocsList || []);  
  
    // makeInvokeMethod(innerFn,self,context)函数  
    // 参数innerFn待控制执行的函数，self为innerFn执行时的上下文，context为控制innerFn条件分支执行状态的操纵对象  
    // 返回invoke函数，触发innerFn函数以特定的条件分支执行，或报错，或终结生成函数  
    generator._invoke = makeInvokeMethod(innerFn, self, context);  
  
    return generator;  
  }  
  runtime.wrap = wrap;  
  
  // 执行fn函数，以obj为上下文，arg为参数，返回{type:"normal",arg:fn.call(obj,arg)}或{type:"throw",arg:err}  
  function tryCatch(fn, obj, arg) {  
    try {  
      return { type: "normal", arg: fn.call(obj, arg) };  
    } catch (err) {  
      return { type: "throw", arg: err };  
    }  
  }  
  
  // 将传参genFun函数封装成生成器函数"GeneratorFunction"，具体细节是  
  //    __proto__属性设置为GeneratorFunctionPrototype，[toStringTagSymbol]属性设为"GeneratorFunction"  
  //    prototype属性设为Gp对象(迭代器原型)，即Generator的prototype的原型，使genFun instanceof Generator返回真值  
  // 注：instanceof方法用于判断对象是否某构造函数的实例，就其本质通过判断该对象是否由构造函数的原型对象Object.create创建  
  runtime.mark = function(genFun) {  
    if (Object.setPrototypeOf) {  
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);  
    } else {  
      genFun.__proto__ = GeneratorFunctionPrototype;  
      if (!(toStringTagSymbol in genFun)) {  
        genFun[toStringTagSymbol] = "GeneratorFunction";  
      }  
    }  
    genFun.prototype = Object.create(Gp);  
    return genFun;  
  };  
  
  
  
  // 为编译后的async、await函数提供功能支持  
  // 编译前  
  // var asyncReadFile = async function () {  
  //   var f1 = await readFile('/etc/fstab');  
  //   var f2 = await readFile('/etc/shells');  
  //   console.log(f1.toString());  
  //   console.log(f2.toString());  
  // };  
  // 编译后？？？  
  
  // `await x`编译成成`yield regeneratorRuntime.awrap(x)`, x添加__await属性为arg  
  // async函数中的yield编译后，由AsyncIterator使其返回promise对象  
  runtime.awrap = function(arg) {  
    return { __await: arg };  
  };  
  
  // 通过_invoke方法使AsyncIterator.next|return|throw方法返回promise对象，实现异步逻辑  
  // 当存在await函数时，将延迟函数的返回值value作为下一次next方法的参数  
  // 当不存在await函数时，将延迟对象的返回值以{value:value}输出给成功或失败的回调函数  
  function AsyncIterator(generator) {  
    function invoke(method, arg, resolve, reject) {  
      // try(fn,obj,arg)执行fn函数，以obj为上下文，arg为参数  
      // 返回{type:"normal",arg:fn.call(obj,arg)}或{type:"throw",arg:err}，err为fn执行过程中捕获的错误  
      var record = tryCatch(generator[method], generator, arg);  
      if (record.type === "throw") {  
        reject(record.arg);  
      } else {  
        var result = record.arg;  
        var value = result.value;  
        // await函数包裹，再次调用invoke函数装饰将延迟函数返回值value传递给另一个Promise对象  
        // 成功或失败时的回调函数是promise延迟对象  
        if (value && typeof value === "object" && hasOwn.call(value, "__await")) {  
          return Promise.resolve(value.__await).then(function(value) {  
            invoke("next", value, resolve, reject);  
          }, function(err) {  
            invoke("throw", err, resolve, reject);  
          });  
        }  
  
        // 没有await函数包裹，resolve函数获得的参数为{value}，返回值的value属性为延迟函数的返回值  
        // 成功或失败时的回调函数是普通函数，不是promise对象  
        return Promise.resolve(value).then(function(unwrapped) {  
          result.value = unwrapped;  
          resolve(result);  
        }, reject);  
      }  
    }  
  
    if (typeof process === "object" && process.domain) {  
      invoke = process.domain.bind(invoke);  
    }  
  
    // 再次调用AsyncIterator的next、throw、return方法时，previousPromise为真值  
    var previousPromise;  
  
    function enqueue(method, arg) {  
      function callInvokeWithMethodAndArg() {  
        return new Promise(function(resolve, reject) {  
          invoke(method, arg, resolve, reject);  
        });  
      }  
  
      return previousPromise = previousPromise   
        // 首次调用AsyncIterator的next方法，callInvokeWithMethodAndArg构造promise对象作为成功或失败的回调  
        ? previousPromise.then( callInvokeWithMethodAndArg, callInvokeWithMethodAndArg )  
        // 首次调用AsyncIterator的next方法，返回promise，并赋值给previousPromise  
        : callInvokeWithMethodAndArg();  
    }  
  
    this._invoke = enqueue;  
  }  
  
  defineIteratorMethods(AsyncIterator.prototype);  
  runtime.AsyncIterator = AsyncIterator;  
  
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {  
    var iter = new AsyncIterator( wrap(innerFn, outerFn, self, tryLocsList) );  
  
    return runtime.isGeneratorFunction(outerFn) ? iter   
      : iter.next().then(function(result) { return result.done ? result.value : iter.next(); });  
  };  
  
  
  
  var GenStateSuspendedStart = "suspendedStart";  
  var GenStateSuspendedYield = "suspendedYield";  
  var GenStateExecuting = "executing";  
  var GenStateCompleted = "completed";  
  
  var ContinueSentinel = {};  
  
  // 参数innerFn待控制执行的函数，self为innerFn执行时的上下文，context为控制innerFn条件分支执行状态的操纵对象  
  // 返回invoke函数，触发innerFn函数以特定的条件分支执行，或报错，或终结生成函数  
  function makeInvokeMethod(innerFn, self, context) {  
    var state = GenStateSuspendedStart;  
  
    // 若method为"throw"，报错  
    // 若method为"return"，context.next赋值为"end"，执行innerFn中"end"条件语句分支  
    // 若method为"next"，迭代context.delegate.interator，修改context.next，以执行innerFn中特定条件语句分支  
    return function invoke(method, arg) {  
      if (state === GenStateExecuting) {  
        throw new Error("Generator is already running");  
      }  
  
      // 生成器函数执行完成，报错或者返回{value:undefined,done:true}  
      if (state === GenStateCompleted) {  
        if (method === "throw") {  
          throw arg;  
        }  
  
        return doneResult();  
      }  
  
      context.method = method;  
      context.arg = arg;  
  
      while (true) {  
        var delegate = context.delegate;  
        if (delegate) {  
          // 迭代context.delegate.iterator，顺利迭代时delegateResult赋值为迭代值{value,done}  
          // 报错或迭代完成时，delegateResult赋值为ContinueSentinel，并修改引用对象context的内部属性  
          //    同时context.delegate赋值为null，以退出while循环  
          var delegateResult = maybeInvokeDelegate(delegate, context);  
          // 迭代context.delegate.iterator过程中报错或迭代完成，进入下一条循环语句  
          //    同时因context.delegate=null，直接进入针对context.method作处理的条件语句部分  
          if (delegateResult) {  
            if (delegateResult === ContinueSentinel) continue;  
            return delegateResult;  
          }  
        }  
  
        if (context.method === "next") {  
          // Setting context._sent for legacy support of Babel's  
          // function.sent implementation.  
          context.sent = context._sent = context.arg;  
  
        } else if (context.method === "throw") {  
          // 若context.delegate.iterator初始迭代过程即报错，或method参数为"throw"，未执行innerFn函数  
          //    state状态更迭为GenStateCompleted，同时直接抛出错误  
          if (state === GenStateSuspendedStart) {  
            state = GenStateCompleted;  
            throw context.arg;  
          }  
  
          // 将异常存储在this.tryEntries，并调整context.next的值，进而决定innerFn执行哪个条件语句  
          context.dispatchException(context.arg);  
  
        } else if (context.method === "return") {  
          // 根据context.prev筛选this.tryEntries，以变更context.next，使innerFn执行特定finally条件分支  
          // 执行完成后context.method仍旧为return，再次调用makeInvokeMethod函数使生成器函数终结  
          context.abrupt("return", context.arg);  
        }  
  
        state = GenStateExecuting;  
  
        // try(fn,obj,arg)执行fn函数，以obj为上下文，arg为参数  
        // 返回{type:"normal",arg:fn.call(obj,arg)}或{type:"throw",arg:err}，err为fn执行过程中捕获的错误  
        // innerFn函数中使用执行寻常语句调用或捕获错误等，由context.next决定执行innerFn的哪个条件语句  
        //    switch(context.prev=context.next){  
        //        case context.tryEntries[tryLoc]:  
        //          ...  
        //        case context.tryEntries[catchLoc}]:  
        //          ...  
        //        case context.tryEntries[finallyLoc}]:  
        //          ...  
        //        case context.tryEntries[afterLoc}]:  
        //        case 'end':  
        //          ...  
        //          context.stop();  
        //    }  
        var record = tryCatch(innerFn, self, context);  
  
        if (record.type === "normal") {  
          // context.done为真，生成器函数执行完成；为否，生成器函数仍有yield语句需要执行  
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;  
  
          if (record.arg === ContinueSentinel) {  
            continue;  
          }  
  
          // 生成器函数返回值，单条yield语句或执行完成时的返回值  
          return {  
            value: record.arg,  
            done: context.done  
          };  
  
        // 重新进入循环语句，调用context.dispatchException处理错误  
        } else if (record.type === "throw") {  
          state = GenStateCompleted;  
          context.method = "throw";  
          context.arg = record.arg;  
        }  
      }  
    };  
  }  
  
  // 尝试迭代context.delegate.iterator迭代器中各函数，顺利迭代，返回迭代值{value,done}  
  //    迭代完成时，为context[delegate.resultName]赋值为最终的迭代值value，context.delegate赋值为null  
  //        并返回ContinueSentinel，供makeInvokeMethod捕获处理  
  //    迭代有错时，context.method赋值为"throw"，context.arg赋值为错误，context.delegate赋值为null  
  //        并返回ContinueSentinel，供makeInvokeMethod捕获处理  
  function maybeInvokeDelegate(delegate, context) {  
    var method = delegate.iterator[context.method];  
    if (method === undefined) {  
      // context.method为"throw"或"return"时，context.delegate置为null，以退出makeInvokeMethod中while循环  
      context.delegate = null;  
  
      if (context.method === "throw") {  
        // return=delegate.iterator.return方法存在时，尝试调用maybeInvokeDelegate函数，以执行return方法  
        if (delegate.iterator.return) {  
          context.method = "return";  
          context.arg = undefined;  
          maybeInvokeDelegate(delegate, context);  
  
          if (context.method === "throw") {  
            return ContinueSentinel;  
          }  
        }  
  
        context.method = "throw";  
        context.arg = new TypeError("The iterator does not provide a 'throw' method");  
      }  
  
      return ContinueSentinel;  
    }  
  
    // try(fn,obj,arg)执行fn函数，以obj为上下文，arg为参数  
    // 返回{type:"normal",arg:fn.call(obj,arg)}或{type:"throw",arg:err}，err为fn执行过程中捕获的错误  
    var record = tryCatch(method, delegate.iterator, context.arg);  
  
    if (record.type === "throw") {  
      context.method = "throw";  
      context.arg = record.arg;  
      context.delegate = null;  
      return ContinueSentinel;  
    }  
  
    var info = record.arg;  
  
    if (!info) {  
      context.method = "throw";  
      context.arg = new TypeError("iterator result is not an object");  
      context.delegate = null;  
      return ContinueSentinel;  
    }  
  
    // context.delegate.iterator迭代完成，context[delegate.resultName]赋值为迭代返回值  
    //    context.next赋值为delegate.nextLoc，context.method按条件赋值为"next"，  
    if (info.done) {  
      context[delegate.resultName] = info.value;  
  
      context.next = delegate.nextLoc;  
  
      if (context.method !== "return") {  
        context.method = "next";  
        context.arg = undefined;  
      }  
    } else {  
      return info;  
    }  
  
    context.delegate = null;  
    return ContinueSentinel;  
  }  
  
  
  
  // 遍历取出object对象的集合，使用next方法迭代形式取出反序排列的该属性名集合  
  runtime.keys = function(object) {  
    var keys = [];  
    for (var key in object) {  
      keys.push(key);  
    }  
    keys.reverse();  
  
    return function next() {  
      while (keys.length) {  
        var key = keys.pop();  
        if (key in object) {  
          next.value = key;  
          next.done = false;  
          return next;  
        }  
      }  
  
      next.done = true;  
      return next;  
    };  
  };  
  
  // 参数iterable传入迭代器或数组，封装成可调用next方法进行迭代取值的迭代器  
  function values(iterable) {  
    if (iterable) {  
      var iteratorMethod = iterable[iteratorSymbol];  
      if (iteratorMethod) {  
        return iteratorMethod.call(iterable);  
      }  
  
      if (typeof iterable.next === "function") {  
        return iterable;  
      }  
  
      if (!isNaN(iterable.length)) {  
        var i = -1, next = function next() {  
          while (++i < iterable.length) {  
            if (hasOwn.call(iterable, i)) {  
              next.value = iterable[i];  
              next.done = false;  
              return next;  
            }  
          }  
  
          next.value = undefined;  
          next.done = true;  
  
          return next;  
        };  
  
        return next.next = next;  
      }  
    }  
  
    return { next: doneResult };  
  }  
  runtime.values = values;  
  
  
  
  // 生成器函数或迭代器执行完成，返回{ value: undefined, done: true }  
  function doneResult() {  
    return { value: undefined, done: true };  
  }  
  
  
  
  // pushTryEntry([tryLoc,catchLoc,finallyLoc,afterLoc])，tryLoc,catchLoc,finallyLoc,afterLoc均为数值型  
  // this.tryEntries添加{tryLoc,catchLoc,finallyLoc,afterLoc}  
  function pushTryEntry(locs) {  
    var entry = { tryLoc: locs[0] };  
  
    if (1 in locs) {  
      entry.catchLoc = locs[1];  
    }  
  
    if (2 in locs) {  
      entry.finallyLoc = locs[2];  
      entry.afterLoc = locs[3];  
    }  
  
    this.tryEntries.push(entry);  
  }  
  
  // 重置this.tryEntries[i].completion属性  
  function resetTryEntry(entry) {  
    var record = entry.completion || {};  
    record.type = "normal";  
    delete record.arg;  
    entry.completion = record;  
  }  
  
  function Context(tryLocsList) {  
    // this.tryEntries初始化赋值  
    this.tryEntries = [{ tryLoc: "root" }];  
  
    // 为this.tryEntries添加{tryLoc,catchLoc,finallyLoc,afterLoc}元素  
    tryLocsList.forEach(pushTryEntry, this);  
  
    // 初始化各实例属性，同时this.tryEntries数组中各项添加completion={type:"normal"}属性  
    this.reset(true);  
  }  
  
  // 操控context.next变更，以制约innerFn执行时会进入哪个条件语句分支  
  Context.prototype = {  
    constructor: Context,  
  
    reset: function(skipTempReset) {  
      // context.prev在innerFn函数内变更为context.next，用于决定dispatchException实例方法该怎样调整context.next  
      // context.next在实例方法dispatchException中改变，用于决定innerFn执行哪个条件分支语句  
      //    或者在maybeInvokeDelegate函数赋值为context.delegate.nextLoc  
      // innerFn函数中使用执行寻常语句调用或捕获错误等，由context.next决定执行innerFn的哪个条件语句  
      //    switch(context.prev=context.next){  
      //        case context.tryEntries[tryLoc]:  
      //          ...  
      //        case context.tryEntries[catchLoc}]:  
      //          ...  
      //        case context.tryEntries[finallyLoc}]:  
      //          ...  
      //        case context.tryEntries[afterLoc}]:  
      //        case 'end':  
      //          ...  
      //          context.stop();  
      //    }  
      this.prev = 0;  
      this.next = 0;  
  
      // Resetting context._sent for legacy support of Babel's  
      // function.sent implementation.  
      this.sent = this._sent = undefined;  
  
      // this.done由context实例的stop方法赋值为true，表示迭代终止？？？  
      this.done = false;  
  
      // this.deletate={iterator,resultName,nextLoc}  
      this.delegate = null;  
  
      // this.method="next"|"return" |"throw" 通过执行实例方法或直接赋值改变  
      //    当值为"next"时，maybeInvokeDelegate函数对this.delegate.iterator迭代取值  
      //    当值为"throw"时(该更改过程只能通过在外部对context.method作赋值更改)  
      this.method = "next";  
      this.arg = undefined;  
  
      this.tryEntries.forEach(resetTryEntry);  
  
      if (!skipTempReset) {  
        for (var name in this) {  
          // Not sure about the optimal order of these conditions:  
          if (name.charAt(0) === "t" &&  
              hasOwn.call(this, name) &&  
              !isNaN(+name.slice(1))) {  
            this[name] = undefined;  
          }  
        }  
      }  
    },  
  
    // 抛出this.tryEntries[0]中存储的错误对象；this.done赋值为true，意味生成器函数执行完成  
    stop: function() {  
      this.done = true;  
  
      var rootEntry = this.tryEntries[0];  
      var rootRecord = rootEntry.completion;  
      if (rootRecord.type === "throw") {  
        throw rootRecord.arg;  
      }  
  
      return this.rval;  
    },  
  
    // 将exception存储到this.tryEntries数组项{tryLoc,catchLoc,finallyLoc,completion:{type:"throw",arg:exception}}中，  
    // 条件是context.prev的值大于this.tryEntries数组项的tryLoc属性，小于catchLoc或finallyLoc  
    // 若context.prev小于各tryLoc，通过this.tryEntries[0]将context.next赋值为"end"，进入innerFn函数的end条件语句  
    dispatchException: function(exception) {  
      if (this.done) {  
        throw exception;  
      }  
  
      var context = this;  
      function handle(loc, caught) {  
        record.type = "throw";  
        record.arg = exception;  
        context.next = loc;  
  
        if (caught) {  
          context.method = "next";  
          context.arg = undefined;  
        }  
  
        return !! caught;  
      }  
  
      // 反向遍历this.tryEntries，判断用户配置的tryLoc、catchLoc、finallyLoc后进行操作  
      // 当context.prev>=tryLoc时，获取同数组项this.tryEntries[i]的catchLoc、finallyLoc，赋值给context.next  
      //      同时将捕获的错误exception赋值给this.tryEntries[i]的completion属性，即{type:"throw",arg:exception}  
      //      若进入catchLoc条件分支，意为忽略错误，context.method赋值为"next"，context.arg赋值为undefined  
      // 若没有catchLoc、finallyLoc，遍历到this.tryEntries[i-1]，最终遍历到this.tryEntries[0]={tryLoc:"root"}  
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {  
        var entry = this.tryEntries[i];  
        var record = entry.completion;  
  
        if (entry.tryLoc === "root") {  
          return handle("end");  
        }  
  
        if (entry.tryLoc <= this.prev) {  
          var hasCatch = hasOwn.call(entry, "catchLoc");  
          var hasFinally = hasOwn.call(entry, "finallyLoc");  
  
          if (hasCatch && hasFinally) {  
            if (this.prev < entry.catchLoc) {  
              return handle(entry.catchLoc, true);  
            } else if (this.prev < entry.finallyLoc) {  
              return handle(entry.finallyLoc);  
            }  
  
          } else if (hasCatch) {  
            if (this.prev < entry.catchLoc) {  
              return handle(entry.catchLoc, true);  
            }  
  
          } else if (hasFinally) {  
            if (this.prev < entry.finallyLoc) {  
              return handle(entry.finallyLoc);  
            }  
  
          } else {  
            throw new Error("try statement without catch or finally");  
          }  
        }  
      }  
    },  
  
    // context.next根据context.prev赋值为this.tryEntries中相关的finallyLoc，以执行innerFn中finally条件分支  
    // 或者调用complete实例方法改变context.next，报错或执行innerFn中的特定条件分支  
    abrupt: function(type, arg) {  
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {  
        var entry = this.tryEntries[i];  
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") &&   
          this.prev < entry.finallyLoc) {  
          var finallyEntry = entry;  
          break;  
        }  
      }  
  
      if (finallyEntry && (type === "break" || type === "continue") &&  
          finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {  
        finallyEntry = null;  
      }  
  
      var record = finallyEntry ? finallyEntry.completion : {};  
      record.type = type;  
      record.arg = arg;  
  
      if (finallyEntry) {  
        this.method = "next";  
        this.next = finallyEntry.finallyLoc;  
        return ContinueSentinel;  
      }  
  
      return this.complete(record);  
    },  
  
    // 报错或修改context.next值，以调用innerFn中的特定条件分支；或终结生成器函数  
    complete: function(record, afterLoc) {  
      if (record.type === "throw") {  
        throw record.arg;  
      }  
  
      if (record.type === "break" ||  
          record.type === "continue") {  
        this.next = record.arg;  
      } else if (record.type === "return") {  
        this.rval = this.arg = record.arg;  
        this.method = "return";  
        this.next = "end";  
      } else if (record.type === "normal" && afterLoc) {  
        this.next = afterLoc;  
      }  
  
      return ContinueSentinel;  
    },  
  
    // 调用complete实例方法，传参为this.tryEntries[i](其finallyLoc属性与finallyLoc相符)的completion、afterLoc属性  
    // 最终重置context实例的this.tryEntries[i].completion属性  
    finish: function(finallyLoc) {  
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {  
        var entry = this.tryEntries[i];  
        if (entry.finallyLoc === finallyLoc) {  
          this.complete(entry.completion, entry.afterLoc);  
          resetTryEntry(entry);  
          return ContinueSentinel;  
        }  
      }  
    },  
  
    // 捕获this.tryEntries[i](其finallyLoc属性与tryLoc相符)中存储的错误对象，并返回  
    // 若this.tryEntries中没有与tryLoc相符的数组项，报错  
    "catch": function(tryLoc) {  
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {  
        var entry = this.tryEntries[i];  
        if (entry.tryLoc === tryLoc) {  
          var record = entry.completion;  
          if (record.type === "throw") {  
            var thrown = record.arg;  
            resetTryEntry(entry);  
          }  
          return thrown;  
        }  
      }  
  
      throw new Error("illegal catch attempt");  
    },  
  
     
    // context.delegateYield被调用时，context.delegate.iterator迭代器将代替innerFn输出内容  
    //    即先执行context.delegate.iterator，返回真值直接输出；否值调用innerFn输出结果  
    //    context.delegate.iterator生成器中，通过指定nextLoc跳回到innerFn中  
    // 设置context.delegate.iterator迭代器，该迭代器在maybeInvokeDelegate函数中调用  
    //    迭代完成为context[context.delegate.resultName]赋值为最终迭代值value，context.next为nextLoc  
    delegateYield: function(iterable, resultName, nextLoc) {  
      this.delegate = {  
        iterator: values(iterable),// values函数将iterable封装成可调用next方法进行迭代取值的迭代器  
        resultName: resultName,// this.delegate.iterator迭代完成返回value时，为context[resultName]=value  
        nextLoc: nextLoc  
      };  
  
      if (this.method === "next") {  
        this.arg = undefined;  
      }  
  
      return ContinueSentinel;  
    }  
  };  
})(  
  typeof global === "object" ? global :  
  typeof window === "object" ? window :  
  typeof self === "object" ? self : this  
);  