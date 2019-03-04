
population
    mongoose提供的 population. 用来连接多表数据查询
1. ref 用来指明外联的数据库的名字. 一般,我们需要在schema中就定义好.
    var mongoose = require('mongoose')
        , Schema = mongoose.Schema
    
    var personSchema = Schema({
        _id     : Number,
        name    : String,
        age     : Number,
        stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
    });

    var storySchema = Schema({
        _creator : { type: Schema.Types.ObjectId, ref: 'Person' },
        title    : String
    });

    Story.findOne({title:"喜剧之王"}).populate('_creator').exec((err,story)=>{
        if(err)console.log(err);
        console.log(story._creator.name);
    })
    //使用populate来指定,外联查询的字段, 而且该值必须是_id才行

2. 外键的类型可以是ObjectId, Number, String, Buffer中任何一种，在赋值与填充时保持一致即可
    有时我们需要填充多个字段，这时可以多次调用.populate()， 也可以在一次调用中指定多个字段：
    在.populate()的同时，还可以指定过滤器以及限制大小。 将.populate()的参数换为一个对象即可。

3. 动态引用(联合)
    可以在填充的同时指定其ref
    var userSchema = new Schema({
        _id: Number,
        name: String,
        teacher: Number
    });
    User.
        findOne({ name: 'Val' }).
        populate({
            path: 'teacher',
            model: 'User'   // 在User集合中查找该ID
        })
4. 多级填充
    return await Bis.findById(Bis_id)
        .populate({
            path: 'categorys',
            populate: { path: 'products' }
        })
    bis集合：定义
        categorys: [{
            type: Schema.Types.ObjectId,
            ref: 'Category'
        }]
    Category定义：
        products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],

5.  虚拟（virtual）属性/路径填充
    BandSchema.virtual('members', {
        ref: 'Person', // The model to use
        localField: '_id', // Find people where `localField`
        foreignField: 'band', // is equal to `foreignField`
        // If `justOne` is true, 'members' will be a single doc as opposed to
        // an array. `justOne` is false by default.
        justOne: false,
        options: { sort: { name: -1 }, limit: 5 } // Query options, see http://bit.ly/mongoose-query-options
    });