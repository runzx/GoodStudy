
Hook 的参数通过引用传递。 这意味着您可以更改值，这将反映在insert / update语句中。 Hook 可能包含异步动作 - 在这种情况下，Hook 函数应该返回一个 promise。
三种以编程方式添加 hook 的方法:
    1.通过 .define() 方法
    const User = sequelize.define('user', {
        username: DataTypes.STRING,
        mood: {
          type: DataTypes.ENUM,
          values: ['happy', 'sad', 'neutral']
        }
      }, {
        hooks: {
          beforeValidate: (user, options) => {
            user.mood = 'happy';
          },
          afterValidate: (user, options) => {
            user.username = 'Toni';
          }
        }
      });
      
      // 方法2 通过 . hook() 方法 (或其别名 .addHook() 方法)
      User.hook('beforeValidate', (user, options) => {
        user.mood = 'happy';
      });
      
      User.addHook('afterValidate', 'someCustomName', (user, options) => {
        return sequelize.Promise.reject(new Error("I'm afraid I can't let you do that!"));
      });
      
      // 方法3 通过直接方法
      User.beforeCreate((user, options) => {
        return hashPassword(user.password).then(hashedPw => {
          user.password = hashedPw;
        });
      });
      
      User.afterValidate('myHookAfter', (user, options) => {
        user.username = 'Toni';
      });

移除 Hook
    只能删除有名称参数的 hook。
      
      const Book = sequelize.define('book', {
        title: DataTypes.STRING
      });
      
      Book.addHook('afterCreate', 'notifyUsers', (book, options) => {
        // ...
      });
      
      Book.removeHook('afterCreate', 'notifyUsers');
      你可以有很多同名的 hook。 调用 .removeHook() 将会删除它们。