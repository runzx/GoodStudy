1.从数组/字符串数组中删除重复项
  const values = [3, 1, 3, 5, 2, 4, 4, 4];
  const uniqueValues = [...new Set(values)];
  // uniqueValues is [3, 1, 5, 2, 4]
2.简单搜索（区分大小写）
  所述 filter() 方法创建与通过由提供的功能实现的测试中所有元素的数组。
  const users = [
    { id: 11, name: 'Adam', age: 23, group: 'editor' },
    { id: 47, name: 'John', age: 28, group: 'admin' },
    { id: 85, name: 'William', age: 34, group: 'editor' },
    { id: 97, name: 'Oliver', age: 28, group: 'admin' }
  ];
  let res = users.filter(it => it.name.includes('oli'));
  // res is []
3.简单搜索（不区分大小写）
  let res = users.filter(it => new RegExp('oli', "i").test(it.name));
  // res is
  [
    { id: 97, name: 'Oliver', age: 28, group: 'admin' }
  ]
4.检查是否有任何用户具有管理员权限
  在 some() 方法测试所述阵列中的至少一个元素是否经过所提供的功能来实现的测试。
  const hasAdmin = users.some(user => user.group === 'admin');
  // hasAdmin is true

5.展平数组数组
  第一次迭代的结果等于：[…[], …[1, 2, 3]] 意味着它转换为[1,2,3] - 
    我们在第二次迭代时提供的这个值为'acc'，等等。
  const nested = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  let flat = nested.reduce((acc, it) => [...acc, ...it], []);
  // flat is [1, 2, 3, 4, 5, 6, 7, 8, 9]
  我们可以通过省略空数组[]作为reduce()的第二个参数来略微改进此代码，
    然后嵌套的第一个值将用作初始acc值。
  let flat = nested.reduce((acc, it) => [...acc, ...it]);
  // flat is [1, 2, 3, 4, 5, 6, 7, 8, 9]
  请注意，在reduce中使用spread运算符对性能来说并不是很好。这个例子是测量性能对你的用例☝️有意义的情况
  let flat = [].concat.apply([], nested);

6.创建一个包含指定键频率的对象
  让我们对数组中每个项目的“age”属性进行分组和计算：
  const users = [
    { id: 11, name: 'Adam', age: 23, group: 'editor' },
    { id: 47, name: 'John', age: 28, group: 'admin' },
    { id: 85, name: 'William', age: 34, group: 'editor' },
    { id: 97, name: 'Oliver', age: 28, group: 'admin' }
  ];
  const groupByAge = users.reduce((acc, it) => {
    acc[it.age] = acc[it.age] + 1 || 1;
    return acc;
  }, {});
  // groupByAge is {23: 1, 28: 2, 34: 1}

7.索引对象数组（查找表）
  我们不是通过id处理整个数组来查找用户，而是构造一个用户的id表示密钥的对象（具有恒定的搜索时间）。

  const uTable = users.reduce((acc, it) => (acc[it.id] = it, acc), {})
  // uTable equals:
  {
    11: { id: 11, name: 'Adam', age: 23, group: 'editor' },
    47: { id: 47, name: 'John', age: 28, group: 'admin' },
    85: { id: 85, name: 'William', age: 34, group: 'editor' },
    97: { id: 97, name: 'Oliver', age: 28, group: 'admin' }
  }

8.提取数组中每个项的给定键的唯一值
  让我们创建一个现有用户组的列表。
  map()方法创建呼叫主叫阵列中的每个元件上的提供功能的结果的新的数组。
  const listOfUserGroups = [...new Set(users.map(it => it.group))];
  // listOfUserGroups is ['editor', 'admin'];

9.对象键值映射反转
  const cities = {
    Lyon: 'France',
    Berlin: 'Germany',
    Paris: 'France'
  };
  let countries = Object.keys(cities).reduce(
    (acc, k) => (acc[cities[k]] = [...(acc[cities[k]] || []), k], acc) , {});
  // countries is
  {
    France: ["Lyon", "Paris"],
    Germany: ["Berlin"]
  }
  这个单线程看起来很棘手。我们在这里使用逗号运算符，这意味着我们在括号中返回最后一个值 -  acc。让我们以更加生产就绪和高效的方式重写这个例子：
  let countries = Object.keys(cities).reduce((acc, k) => {
    let country = cities[k];
    acc[country] = acc[country] || [];
    acc[country].push(k);
    return acc;
  }, {});

  这里我们不使用扩展运算符  - 它在每次reduce()调用时创建一个新数组，这会导致很大的性能损失：O(n²)。
    而不是旧的好push()方法。

10.从摄氏度数组中创建一个华氏数值数组
  将其视为使用给定公式处理每个元素🤓
  const celsius = [-15, -5, 0, 10, 16, 20, 24, 32]
  const fahrenheit = celsius.map(t => t * 1.8 + 32);
  // fahrenheit is [5, 23, 32, 50, 60.8, 68, 75.2, 89.6]

11.将对象编码为查询字符串
  const params = {lat: 45, lng: 6, alt: 1000};
  const queryString = Object.entries(params)
  .map(p => encodeURIComponent(p[0]) + '=' + encodeURIComponent(p[1]))
  .join('&')
  // queryString is "lat=45&lng=6&alt=1000"

12.仅使用指定的键将用户表打印为可读字符串
  有时你想用选定的键作为字符串打印你的对象数组，但你意识到JSON.stringify并不是那么好😦
  const users = [
    { id: 11, name: 'Adam', age: 23, group: 'editor' },
    { id: 47, name: 'John', age: 28, group: 'admin' },
    { id: 85, name: 'William', age: 34, group: 'editor' },
    { id: 97, name: 'Oliver', age: 28, group: 'admin' }
  ];
  users.map(({id, age, group}) => `\n${id} ${age} ${group}`).join('')
  // it returns:
  "
  11 23 editor
  47 28 admin
  85 34 editor
  97 28 admin"
13.在对象数组中查找并替换键值对
  假设我们想要改变约翰的年龄。如果您知道索引，可以写下以下行：
    users[1].age = 29. 但是，让我们来看看另一种方法：
  const updatedUsers = users.map(
    p => p.id !== 47 ? p : {...p, age: p.age + 1}
  );
  // John is turning 29 now

14.Union (A ∪ B) of arrays 
  导入和调用lodash方法联合的代码少。
  const arrA = [1, 4, 3, 2];
  const arrB = [5, 2, 6, 7, 1];
  [...new Set([...arrA, ...arrB])]; // returns [1, 4, 3, 2, 5, 6, 7]

15.Intersection (A ∩ B) of arrays
  最后一个！
  const arrA = [1, 4, 3, 2];
  const arrB = [5, 2, 6, 7, 1];
  arrA.filter(it => arrB.includes(it)); // returns [1, 2]
