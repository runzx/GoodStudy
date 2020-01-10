<?php
/**
 * explode — 使用一个字符串分割另一个字符串
 * User: zhaixiang
 * Date: 2017/9/16
 * Time: 21:42
 */
array explode ( string $delimiter , string $string [, int $limit ] );
/**
 * delimiter
    边界上的分隔字符。
string
    输入的字符串。
limit
    如果设置了 limit 参数并且是正数，则返回的数组包含最多 limit 个元素，而最后那个元素将包含 string 的剩余部分。
    如果 limit 参数是负数，则返回除了最后的 -limit 个元素外的所有元素。
    如果 limit 是 0，则会被当做 1。
 */

/**
 * implode — 将一个一维数组的值转化为字符串
 *
 */
string implode ( string $glue , array $pieces );
string implode ( array $pieces );
/**
 * glue
默认为空的字符串。

pieces
你想要转换的数组。

返回值 ¶

返回一个字符串，其内容为由 glue 分割开的数组的值。
 */
