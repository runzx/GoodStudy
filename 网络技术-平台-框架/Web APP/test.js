let length = 10
function fn() {
  console.log('this.length:', this.length)
}
var obj = {
  length: 5,
  method: function(fn) {
    fn()
    function f1() {
      console.log('this:', this)
    }
    f1()
    arguments[0]()
  },
  o: function() {
    console.log('this.length:', this.length)
  }
}
obj.method(fn, 1)
// obj.o()
