// 给定一个无序整数数组和一个值 sum，如果存在其中两个元素的之和等于 sum，返回 true。否则，返回 false
const findSum = (arr, val) => {
  let searchValues = new Set()
  searchValues.add(val - arr[0])
  for (let i = 1, length = arr.length; i < length; i++) {
    let searchVal = val - arr[i]
    if (searchValues.has(arr[i])) {
      return true
    } else {
      searchValues.add(searchVal)
    }
  }
  return false
}

const findSum = (arr, val) => {
  const searchValues = new Set()
  for (const item of arr) {
    if (searchValues.has(item)) return true
    searchValues.add(val - item)
  }
  return false
}

// 更简洁的版本:
const findSum = (arr, sum) => arr.some((set => n => set.has(n) || !set.add(sum - n))(new Set()))

arr.some(
  (function(set) {
    return function(n) {
      return set.has(n) || !set.add(sum - n) // 没有has()false, add(),取反是为了返回false
    }
  })(new Set())
) // n才是some(fun(n))传入的参数

// 因为 Set.prototype.has() 的时间复杂度仅为 O(1) ，所以使用 Set 存储匹配值而不是数组，
// 帮助我们整体解决方案达到线性运行时间 O(N)。
// 如果我们依赖于 Array.prototype.indexOf() 或 Array.prototype.includes()，
// 这两个方法的时间复杂度都为 O(N)，那么整体运行时间的时间复杂度为 O(N²)。慢太多了！
