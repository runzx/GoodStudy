import { nSQL } from "@nano-sql/core";

// Get all rows from the users table.
nSQL("users").query("select").exec().then((rows) => {
  console.log(rows) // <= array of row objects
});

// Get all rows, but only the username column.
nSQL("users").query("select",["username"]).exec().then..

// Get username column and return it as name, then also get the age column.
nSQL("users").query("select",["username AS name","age"]).exec().then...

// Apply an aggregate function to the query...
nSQL("users").query("select",["COUNT(*) AS totalUsers"]).exec().then...
nSQL("users").query("select",["AVG(age) AS averageAge"]).exec().then..

// Query against properties of a column
nSQL("users").query("select").where(["posts.length", ">", 3]).exec().then...
nSQL("users").query("select").where(["meta.eyeColor", "=", "blue"]).exec().then...
nSQL("users").query("select", ["AVG(posts.length) AS averagePostCount"]).exec().then...

// Users over 25 and under 50
nSQL("users").query("select").where([["age",">",25],"AND",["age","<=",50]]).exec()

// Use a function
nSQL("users").query("select").where(user => user.age > 25).exec().then...