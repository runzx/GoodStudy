// NodeJS/Electron
import { SQLite } from "@nano-sql/adapter-sqlite";
import { nSQL } from "@nano-sql/core";
 
nSQL().createDatabase({
    id: "my_db",
    mode: new SQLite(),
    tables: [...]
}).then(...)

// NativeScript 包括所有类型，在iOS或Android中运行
import { NativeSQLite } from "@nano-sql/adapter-sqlite-nativescript";
// MUST include nSQL from the lib path.
import { nSQL } from "@nano-sql/core/lib/index";
 
nSQL().createDatabase({
    id: "my_db",
    mode: new NativeSQLite(),
    tables: [...]
}).then(...)