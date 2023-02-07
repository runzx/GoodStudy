var gql = require('./nanographql')
let abc = (e)=>{
    console.log(e);
}
let tmp =abc`
query($name: String!) {
  movie (name: $name) {
    releaseDate
  }
}
`
var query = gql`
  query($name: String!) {
    movie (name: $name) {
      releaseDate
    }
  }
`
/**
 这个query是什么？以前顶层不都是一个大括号嘛？其实顶层大括号就是query开头的简写。后面我们在query上增加了一个($someName: String!)的意思是增加一个query变量，作为整个query的参数使用，比如我下面就交给了hello的name参数，当然显而易见的是它们的类型必须相同。我们还可以看到GraphiQL的左下角有个很猥琐的Query Variables可以让你输入为Query准备的变量，于是我们输入：
  在这里gql是一个科里化函数，你可以看到连续两个括号。
{"someName":  "GraphQL"}
 */
let run = async () =>{
    let body = query({ name: 'Back to the Future' })
    try {
        var res = await fetch('/query', {
          body: query({ name: 'Back to the Future' }),
          method: 'POST'
        })
        var json = res.json()
        console.log(json)
      } catch (err) {
        console.error(err)
      }
}

run()

/**
API
    query = gql(string)
    Create a new graphql query function.

    json = query([data])
    Create a new query object that can be sent as application/json to a server.
 
 */