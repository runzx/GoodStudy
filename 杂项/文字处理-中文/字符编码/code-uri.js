const querystring = require('querystring')

let res = querystring.stringify({
  foo: 'bar', baz: [12, 345]
}, null, null,
  {
    encodeURIComponent(str) {
      console.log('str:', str)
    }
  })