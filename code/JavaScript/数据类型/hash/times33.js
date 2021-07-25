/**
 * 
 * 基于 Time33 的哈希函数，又叫 DJBX33A 算法(Daniel J. Bernstein, Times 33 with Addition)，其实现就是不断的乘以33。
 * 小写英文词汇适合33, 大小写混合使用65。time33比较适合的是英文词汇的hash.
 * 虽然33并不一定是最好的数值。但17、31、33、63、127和129等相对其他的奇数的一个很明显的优势是，由于这些奇数与16、32、64、128只相差1，可以通过移位（如1 << 4 = 16）和加减1来代替乘法，速度更快。
 * 5381（001 010 100 000 101），据说hash后的分布更好一些。
 * 
 */
function genHash (str){
    var hash = 5381;
    str = str || '';

    for(var i=0, len=str.length; i<len; ++i){
        hash += (hash << 5) + str.charAt(i).charCodeAt();
    }

    return hash & 0x7fffffff;
}
console.log(genHash('zhaixiang'))
console.log(genHash('zhaixziyi'))
console.log(genHash('zhaizimo'))
console.log(genHash('zhaix'))
console.log(genHash('zx'))
console.log(genHash('a'))
const {fnv} = require('./demo4')
console.log(fnv('zhaixiang'))