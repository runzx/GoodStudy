
import { MongoDB } from "@nano-sql/adapter-mongo";
import { nSQL } from "@nano-sql/core";
 
nSQL().connect({
    id: "my_db",
    mode: new MongoDB("mongodb://localhost:27017"),
    tables: [...]
}).then(...)