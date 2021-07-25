// watch 的一个特点是，最初绑定的时候是不会执行的，要等到 firstName 改变时才执行监听计算。那我们想要一开始就让他最初绑定的时候就执行改怎么办呢？我们需要修改一下我们的 watch 写法

v = {
  watch: {
    firstName: {
      handler(newName, oldName) {
        this.fullName = newName + ' ' + this.lastName
      },
      // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
      immediate: true, // 将立即以表达式的当前值触发回调
      deep: true // 发现对象内部值的变化,注意监听数组的变动不需要这么做
    }
  }
}
// 回调
function (newVal, oldVal) {
  // 做点什么
}
// 不应该使用箭头函数来定义 watcher 函数