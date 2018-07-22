//
var mysqlAdapter = require('sails-mysql'),
    mongoAdapter = require('sails-mongo'),
    Waterline = require('waterline') ;

var adapters = {
    mongo : mongoAdapter,
    mysql : mysqlAdapter,
    default : 'mongo'  
};
// 连接
var connections = {
    mongo : {
        adapter : 'mongo',
        url : 'mongodb://user:pass@localhost/waterline-sample'
    },
    mysql : {
        adapter : 'mysql',
        url : 'mysql://root:zx@localhost/waterlineSample'   // mysql 里不能用'-'
    }
}
/**
 * 数据集合
 * collection 对应：sql里的表， mongo里的集合
 */
var User = Waterline.Collection.extend({
    identity : 'user',
    connection : 'mongo',
    schema : true,  //强制模式，检查多余字段
    attributes : {
        username : {
            type : 'string',
            required : true //检验
        },
        birthday : {
            type : 'date',
            after : new Date('1980-01-01'),
            before: () => {
                return new Date();  // 自定义一个时间段
            }
        },
        createTime: {
            type : 'date'
        },
        beforeCreate : (value, cb) => {
            value.createTime = new Date();
            console.log('beforeCreate executed');
            return cb();
        }
    }

});

/**
 * 校验器
 * Anchor, 预定义，自定义
 * 
 */

 /**
  * 中间件
  生命周期回调 Lifecycle Callbacks

  */

// 初始化
var orm = new Waterline();

orm.loadcollection(User);

var config = {
    adapters : adapters,
    connections : connections
}
orm.initialize(config, (err, models) => {
    if(err){
        console.error(err);
        return
    }
    console.log(models);
    return models
});
