/* 
Browser
In the browser you can use IndexedDB, WebSQL or Local Storage

Uses	Supports	  Max               Data
TEMP	Memory	    Everything	      100MB+
PERM	Autodetect	All Browsers	    5 - 100MB+
IDB	  Indexed DB	All Browsers**	  50MB+
WSQL	Web SQL	    Chrome & Safari**	100MB+
LS	  Local Storage	All Browsers	  5MB

  ** Indexed DB and WebSQL aren't supported by older browsers.
 */
nSQL()
  .createDatabase({
    mode: 'PERM', // autodetect best method and persist data.
    id: 'my_db',
    tables: []
  })
  .then()

/* 
NodeJS
With NodeJS you really have only two choices: Memory or SnapDB.

Uses	      Supports	  Max               Data
TEMP	      Memory	    Everything	      ?
PERM / SNP  SnapDB	                      < 10GB
LevelDB     第三方                         10GB+
RocksDB     第三方                         10GB+
 */
// SnapDB是 NodeJS/Electron
// SnapDB是一个纯javascript持久键值存储，提供从键到字符串值的有序映射。使用受LevelDB / RocksDB启发的日志结构合并树（LSM树）将数据持久保存到磁盘。SnapDB与LevelDB和RocksDB具有100％的API兼容性，还包括其他功能。
// <10GB
// The SnapDB store isn't good for high volume, production systems. It's recommended you switch to LevelDB or RocksDB

嵌入式数据库RocksDB是Facebook基于LevelDB开发的一种嵌入式Key-value存储系统，该数据库能够充分利用闪存的性能，大大提升应用服务器的速度。

Rocksdb. 这个开源引擎是基于 Google 的 leveldb 1.5 版本, 但据称做了许多优化, 性能相对 leveldb 有了很大的提升, 而且解决了 leveldb 主动限制写的问题.

nodejs PERM 就是 SNP -> snapDB ,其用了precss.fork()

child_process.fork(path.join(__dirname, "database.js"),{execArgv: []});
这样vscode才能正常调试