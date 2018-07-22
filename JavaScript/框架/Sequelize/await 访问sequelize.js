
// ES7 await 调用：
(async () => {
    var pets = await Pet.findAll();
})();

//写入数据
var now = Date.now();
(async () => {
    var dog = await Pet.create({
        id: 'd-' + now,
        name: 'haha',
        gender: false,
        birth: '2008-08-08',
        createdAt: now,
        updatedAt: now,
        version: 0
    });
    console.log('created: ' + JSON.stringify(dog));
})();

// 查询成功后会返回包含多个实例（instance）的数组。
var queryFromSomewhere = async (animals) => {
    var pets = await Pet.findAll({
        where: {
            name: animals || 'pig'
        }
    });
    console.log(`find ${pets.length} pets:`);
    for (let p of pets) {
        console.log(JSON.stringify(p));
    }
    return pets;

};

// 通过获取的示例进行数据更新
(async () => {
    try {
        var pets = await queryFromSomewhere("dog");
        for (let p of pets) {
            p.gender = true;
            p.updatedAt = Date.now();
            p.version++;
            await p.save();
        }
    } catch (err) {
        console.log(err);
    }
})();

// 通过获取的示例进行数据更新
(async () => {
    try {
        var pets = await queryFromSomewhere("rabbit");
        for (let p of pets) {
            await p.destroy();
        }
    } catch (err) {
        console.log(err);
    }
})();

1. Model相当于数据库中表，有时它也会被称为“模型”或“工厂”。Model不能通过构造函数创建，
    而只能通过sequlize.define方法来定义或通过sequlize.import导入。通过define定义一个Model，
    就相当于定义了一种模型与数据表之间的映射关系，通过模型可以实现对表记录的增、删、改、查等操作。
