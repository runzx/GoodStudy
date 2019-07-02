/**
 * 如果使用g标志，则将返回与完整正则表达式匹配的所有结果（Array），
 *    但不会返回捕获组，或者未匹配 null。
 *
 * 如果未使用g标志，则仅返回第一个完整匹配及其相关的捕获组（Array）。
 *    在这种情况下，返回的项目将具有如下所述的其他属性，或者未匹配 null。
 */
str.match(regexp)

// js正则最全文档
const url =
  'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions'

const reg = /(?:x)/ // 匹配 'x' 但是不记住匹配项。这种叫作非捕获括号(不会分组)，使得你能够定义为与正则表达式运算符一起使用的子表达式。
const r = /(?:foo){1,2}/ // 最多2次： foofoo
const imgReg = /<img.*?(?:>|\/>)/gi // 匹配 > 或 /> 结尾， 这里用(>|\/>) 也可以
