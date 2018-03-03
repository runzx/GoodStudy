Models Definition

Model相当于数据库中的表，该对象不能通过构造函数实例化，而
    只能通过sequelize.define()或sequelize.import()方法创建。\
0. 常用方法
    1）findOrCreate - 从数据库中查找一个指定元素如果不存在则创建记录
    2）
        // 按已知 id查找
        Project.findById(123).then(function(project) {
            // project 是一个 Project 实例，且包含存储在数据中的数据
            // 当不存在 id 为123的记录时 project 为 null
        })
        
        // 按属性查找
        Project.findOne({ where: {title: 'aProject'}
            ,attributes: ['id', ['name', 'title']] })
                .then(function(project) {
                // project 是匹配到的第一个 title 为 'aProject' 的 Projects 或 null
                // project 的 project.title 属性中会包含 'name'
                })
    3) 查询返回结果 result.dataValues.id =1
        findCreateFind().spread((user, created) =>{})   此方法没用事务，速度比findOrCreate快
            注： 如果查询是用id, 生成新的ID值会用查询的数值!
  
1. demo
    let DeviceInterface = Sequelize.define(
        'DeviceInterface'
        , {
            'emp_id': {
                'type': Sequelize.CHAR(10), // 字段类型
                'allowNull': false,         // 是否允许为NULL
                'unique': true              // 字段是否UNIQUE
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            createBy: {
                type: Sequelize.INTEGER,
                defaultValue: '-1',
                validate: {
                    is: ["[a-z]",'i'],        // will only allow letters
                    max: 23,                  // only allow values <= 23
                    isIn: {
                      args: [['en', 'zh']],
                      msg: "Must be English or Chinese"
                    }
                  },
                  field: 'column_a'
                  // Other attributes here
            }
        }
        , {
            // 自定义表名
            'freezeTableName': true,
            'tableName': 'xyz_users',
    
            // 是否需要增加createdAt、updatedAt、deletedAt字段
            'timestamps': true,     // 默认 true
    
            // 不需要createdAt字段
            'createdAt': false,
    
            // 将updatedAt字段改个名
            'updatedAt': 'utime',
    
            // 将deletedAt字段改名
            // 同时需要设置paranoid为true（此种模式下，删除数据时不会进行物理删除，而是设置deletedAt为当前时间
            'deletedAt': 'dtime',
            'paranoid': true,
            // 不使用驼峰式命令规则，这样会在使用下划线分隔
            // 这样 updatedAt 的字段名会是 updated_at
            underscored: true,
        }
    );

    2）列(字段)的定义可以是字符串、一个预定义的Sequelize构造函数、或是一个对象。
        在定义列时，我们可以指定数据类型，也可以指定默认值、主键/外键等约束，
        还可以自定义访问器（getter）和设置器（setter）。
    3）sequelize.import() - 模型导入
        UseModel = sequelize.import(path) 
        通过文件导入模型定义。检查模型是否已经定义。
        被导入的模型会被缓存，所以多次导入并不会重复加载
        path表示要导入文件的路径，如果使用相对路径会自动转换为绝对路径。

2. Promise
    Sequelize基于Promise实现异步流程控制，但其使用的并不是ECMAScript 6中规定的标准Promise对象，而是使用bluebird，这个模块是对原生Promise的一个扩展。
    user = User.findOne();  // user 是一个promise对象
3. Data types

    // 枚举
    sequelize.define('model', {
        states: {
        type:   Sequelize.ENUM,
        values: ['active', 'pending', 'deleted']
        }
    })
    Sequelize.STRING                      // VARCHAR(255)
    Sequelize.STRING(1234)                // VARCHAR(1234)
    Sequelize.STRING.BINARY               // VARCHAR BINARY
    Sequelize.TEXT                        // TEXT
    Sequelize.TEXT('tiny')                // TINYTEXT

    Sequelize.INTEGER                     // INTEGER
    Sequelize.BIGINT                      // BIGINT
    Sequelize.BIGINT(11)                  // BIGINT(11)

    Sequelize.FLOAT                       // FLOAT
    Sequelize.FLOAT(11)                   // FLOAT(11)
    Sequelize.FLOAT(11, 12)               // FLOAT(11,12)

    Sequelize.REAL                        // REAL        PostgreSQL only.
    Sequelize.REAL(11)                    // REAL(11)    PostgreSQL only.
    Sequelize.REAL(11, 12)                // REAL(11,12) PostgreSQL only.

    Sequelize.DOUBLE                      // DOUBLE
    Sequelize.DOUBLE(11)                  // DOUBLE(11)
    Sequelize.DOUBLE(11, 12)              // DOUBLE(11,12)

    Sequelize.DECIMAL                     // DECIMAL
    Sequelize.DECIMAL(10, 2)              // DECIMAL(10,2)

    Sequelize.DATE                        // DATETIME for mysql / sqlite, TIMESTAMP WITH TIME ZONE for postgres
    Sequelize.DATE(6)                     // DATETIME(6) for mysql 5.6.4+. Fractional seconds support with up to 6 digits of precision 
    Sequelize.DATEONLY                    // DATE without time.
    Sequelize.BOOLEAN                     // TINYINT(1)

    Sequelize.ENUM('value 1', 'value 2')  // An ENUM with allowed values 'value 1' and 'value 2'
    Sequelize.ARRAY(Sequelize.TEXT)       // Defines an array. PostgreSQL only.

    Sequelize.JSON                        // JSON column. PostgreSQL only.
    Sequelize.JSONB                       // JSONB column. PostgreSQL only.

    Sequelize.BLOB                        // BLOB (bytea for PostgreSQL)
    Sequelize.BLOB('tiny')                // TINYBLOB (bytea for PostgreSQL. Other options are medium and long)

    Sequelize.UUID                        // UUID datatype for PostgreSQL and SQLite, CHAR(36) BINARY for MySQL (use defaultValue: Sequelize.UUIDV1 or Sequelize.UUIDV4 to make sequelize generate the ids automatically)

    Sequelize.RANGE(Sequelize.INTEGER)    // Defines int4range range. PostgreSQL only.
    Sequelize.RANGE(Sequelize.BIGINT)     // Defined int8range range. PostgreSQL only.
    Sequelize.RANGE(Sequelize.DATE)       // Defines tstzrange range. PostgreSQL only.
    Sequelize.RANGE(Sequelize.DATEONLY)   // Defines daterange range. PostgreSQL only.
    Sequelize.RANGE(Sequelize.DECIMAL)    // Defines numrange range. PostgreSQL only.

    Sequelize.ARRAY(Sequelize.RANGE(Sequelize.DATE)) // Defines array of tstzrange ranges. PostgreSQL only.

    Sequelize.GEOMETRY                    // Spatial column.  PostgreSQL (with PostGIS) or MySQL only.
    Sequelize.GEOMETRY('POINT')           // Spatial column with geometry type.  PostgreSQL (with PostGIS) or MySQL only.
    Sequelize.GEOMETRY('POINT', 4326)     // Spatial column with geometry type and SRID.  PostgreSQL (with PostGIS) or MySQL only.

4. Validations - 验证
    模型验证，让我们可以模型的每个属性执行验证。
    我们通过模型列属性的validate属性来添加验证，
        这些验证会在模型实例执行create、update和save自动执行。
        也可以通过instance.validate()方法，来手工验证模型实例。

    var ValidateMe = sequelize.define('foo', {
        foo: {
            type: Sequelize.STRING,
            validate: {
                is: ["^[a-z]+$",'i'],     // 只允许字母
                is: /^[a-z]+$/i,          // 只允许字母
                not: ["[a-z]",'i'],       // 不能使用字母
                isEmail: true,            // 检测邮箱格式 (foo@bar.com)
                isUrl: true,              // 检查Url格式 (http://foo.com)
                isIP: true,               // 检查 IPv4 或 IPv6 格式
                isIPv4: true,             // 检查 IPv4
                isIPv6: true,             // 检查 IPv6
                isAlpha: true,            // 不能使用字母
                isAlphanumeric: true,     // 只允许字母数字字符
                isNumeric: true,          // 只能使用数字
                isInt: true,              // 只能是整数
                isFloat: true,            // 只能是浮点数
                isDecimal: true,          // 检查数字
                isLowercase: true,        // 检查小写字母
                isUppercase: true,        // 检查大写字母
                notNull: true,            // 不允许null
                isNull: true,             // 只能为null
                notEmpty: true,           // 不能空字符串
                equals: 'specific value', // 只能使用指定值
                contains: 'foo',          // 必须包含子字符串
                notIn: [['foo', 'bar']],  // 不能是数组中的任意一个值
                isIn: [['foo', 'bar']],   // 只能是数组中的任意一个值
                notContains: 'bar',       // 不能包含子字符串
                len: [2, 10],              // 值的长度必在 2 和 10 之间
                isUUID: 4,                // 只能是UUID
                isDate: true,             // 只能是日期字符串
                isAfter: "2011-11-05",    // 只能使用指定日期之后的时间
                isBefore: "2011-11-05",   // 只能使用指定日期之前的时间
                max: 23,                  // 允许的最大值
                min: 23,                  // 允许的最小值
                isArray: true,            // 不能使用数组
                isCreditCard: true,       // 检查是有效的信用卡

                // 也可以自定义验证:
                isEven: function(value) {
                    if(parseInt(value) % 2 != 0) {
                    throw new Error('Only even values are allowed!')
                    // we also are in the model's context here, so this.otherField
                    // would get the value of otherField if it existed
                    }
                }
            }
        }
    });
    验证时可以使用自定义的错误信息代替validator.js的默认信息，只需要在通过对象或数组的方式提供参数即可：
    isInt: {
        msg: "Must be an integer number of pennies"
    }
    或者参数中同样需要提供args属性：
    isIn: {
        args: [['en', 'zh']],
        msg: "Must be English or Chinese"
    }