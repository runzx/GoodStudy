where
用它可以执行任意javacript语句作为查询的一部分,如果回调函数返回 true 文档就作为结果的一部分返回

	find( {'$where' : function(){
		for( var x in this ){
		 //这个函数中的 this 就是文档
		}
		
		if(this.x !== null && this.y !== null){
		    return this.x + this.y === 10 ? true : false;
		}else{
		    return true;
		}
  }})
简化版本

	find( {'$where' :  'this.x + this.y === 10' } )
	find( {'$where' : ' function(){ return this.x + this.y ===10; } ' } )

// demo 
Model
	.where('age').gte(25)
	.where('tags').in(['movie', 'music', 'art'])
	.select('name', 'age', 'tags')
	.skip(20)
	.limit(10)
	.asc('age')
	.slaveOk()
	.hint({ age: 1, name: 1 })
	.run(callback)

var query = Model.find({});
query.where('field', 5);
query.limit(5);
query.skip(100);

query.exec(function (err, docs) {
  // called when the `query.complete` or `query.error` are called
  // internally
});
// 模糊查询 正则	$i表示忽略大小写
Job.find({
	$or: [
	  {'description': {'$regex': key, $options: '$i'}},
	  {'city': {'$regex': key, $options: '$i'}},
	  {'name': {'$regex': key, $options: '$i'}}]
  })
  .populate('JobType', 'name')
  .exec(function (err, jobs) {
	if (err) {
	  callback(err);
	} else {
	  callback(null, jobs);
	}
  })

  Person
      .find({ occupation: /host/ }) 
      .where('name.last').equals('Ghost')   // Person.name.last是Ghost
      .where('age').gt(17).lt(66)  // 17 < Person.age <66
      .where('likes').in(['vaporizing', 'talking'])//likes是vaporizing或者talking
      .limit(10)  //限制10条记录
      .sort('-occupation')  //根据occupation的倒序排
      .select('name occupation') //选择name和occupation字段
      .exec(callback);