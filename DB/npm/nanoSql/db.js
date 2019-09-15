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