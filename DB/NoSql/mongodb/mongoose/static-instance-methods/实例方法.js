  Instance methods
// 实例Models是文件。文档有许多自己的内置实例方法。我们也可以定义自己的自定义文档实例方法
  // define a schema
  var animalSchema = new Schema({ name: String, type: String });

  // assign a function to the "methods" object of our animalSchema
  animalSchema.methods.findSimilarTypes = function(cb) {
    return this.model('Animal').find({ type: this.type }, cb);
  };

  var Animal = mongoose.model('Animal', animalSchema);
  var dog = new Animal({ type: 'dog' });

  dog.findSimilarTypes(function(err, dogs) {
    console.log(dogs); // woof
  });

  // 不要不声明使用ES6箭头函数的方法（=>）。箭头函数显式阻止绑定this，
    // 因此您的方法将无法访问该文档，上述示例将无法正常工作。