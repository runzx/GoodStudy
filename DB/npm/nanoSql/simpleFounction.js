// 简单功能
// 简单函数通常将特定列中的值转换为所需值。与聚合函数不同，简单函数将为查询的每一行返回一个值
// GREATEST(arg1, arg2, arg3, ....)
// LEAST(arg1, arg2, arg3, ....)
// returns 20 or the users age if it's higher
nSQL('users')
  .query('select', ['name', 'GREATEST(20, age)'])
  .exec()

// can also be used to compare one row value to another
nSQL('users')
  .query('select', ['name', 'GREATEST(balance, points)'])
  .exec()

UPPER(expression)
LOWER(expression)

FORMAT_NUMBER(expression, truncate) // 此函数接受一个数字并将其转换为格式化字符串，可选择将字符串固定为特定长度。

TRIM(expression)

IF(expression, trueArg, falseArg) // 如果表达式为true，则返回第二个参数，否则返回第三个参数。

CAST(column, type)  // 此函数采用列值和类型，然后将列值更改为提供的类型

CONCAT(arg1, arg2, arg3, ....)  //String.join（）一样工作，将多个值合并为一个字符串
CONCAT_WS(expression, arg1, arg2, arg3, ....)

REPLACE(subject, find, replace)
STRCMP(subject1, subject2)  //如果字符串匹配则返回0，如果第一个字符串大于第二个字符串则返回-1，否则返回1

CROW(column, latitude, longitude)
LEVENSHTEIN(expression1, expression2)

ADD(arg1, arg2, arg3, ...)
SUB(arg1, arg2, arg3, ...)
DIV(arg1, arg2)
MULT(arg1, arg2, arg3, ...)
MOD(arg1, arg2)
TRUNCATE(arg1, arg2)

// IE9 +支持:(这些数学函数在几乎任何环境中都是安全的）

  ABS，ACOS，ASIN，ATAN，ATAN2，CEIL，COS，EXP，FLOOR，LOG，
  MAX，MIN，POW，RANDOM，ROUND，SIN，SQRT，TAN
  
// ES6支持:(这些功能需要更新的环境）
  
  ACOSH，ASINH，ATANH，CBRT，EXPM1，CLZ32，COSH，FROUND，
  HYPOT，IMUL，LOG1P，LOG2，LOG10，SIGN，SINH，TANH，TRUNC，
  E，LN10，LN2，LOG10E，LOG2E，PI，SQRT1_2，SQRT2

