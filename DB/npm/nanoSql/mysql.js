import { MySQL } from "@nano-sql/adapter-mysql";
import { nSQL } from "@nano-sql/core";
 
nSQL().connect({
    id: "my_db",
    mode: new MySQL({ // required
        host: "localhost",
        database: "test",
        user: "root",
        password: "secret"
    }),
    tables: [...]
}).then(...)