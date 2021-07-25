## prop 表单

表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的
string
传入 Form 组件的 model 中的字段

动态 增减表单项  
```js
v-for="(item,index) in spu.specs"
:label="'规格'+(index+1)+':'+item.name"
:prop="'specs.'+index"
:prop="'specs['+index+'].value'"  // 另一种写法
:rules="{validator:ruleSpecs, trigger:'blur'}"
```
