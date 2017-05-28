//php中foreach()的用法
<?php

// 1： 
    foreach(array_name as $value)
   {
      statement;
   }
   //这里的array_name是你要遍历的数组名，
   //每次循环中，array_name数组的当前元素的值被赋给$value,
   //并且数组内部的下标向下移一步，也就是下次循环回得到下一个元素。
//2. 
    foreach(array_name as $key => $value)
    {
        statement; 
    }
    //当前元素的键值也会在每次循环中被赋给变量$key。键值可以是下标值，也可以是字符串。
    //比如book[0]=1中的“0”，book[id]="001"中的“id”.
    
