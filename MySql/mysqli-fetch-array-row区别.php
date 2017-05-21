
// mysql_fetch_row,mysql_fetch_array,mysql_fetch_assoc的区别

    这两个函数，返回的都是结果集中一行数据数组，区别就是第一个函数返回的数组是只包含值，我们只能$row[0],$row[1],这样以数组下标来读取数据，
        依次调用 mysql_fetch_row() 将返回结果集中的下一行，如果没有更多行则返回 FALSE。
    而mysql_fetch_array()返回的数组既包含第一种，也包含键值对的形式，我们可以这样读取数据，
         （假如数据库的字段是 username,passwd）: 　　$row['username'], $row['passwd']
　　      而且，如果用($row as $kay => $value)来操作的话，还以直接取得数据库的字段名称。
    更主要的是mysqli是php5提供的新函数库，(i)表示改进，其执行速度更快.

    补充一点：

        mysql_fetch_array() 中可选的第二个参数 result_type 是一个常量，可以接受以下值：MYSQL_ASSOC，MYSQL_NUM 和 MYSQL_BOTH。其中：
            1、mysql_fetch_assoc($result)==mysql_fetch_array($result,MYSQL_ASSOC);
            2、mysql_fetch_row($result)==mysql_fetch_array($result,MYSQL_NUM);
            所以mysql_fetch_array()函数在某种程度上可以算是mysql_fetch_row()与 mysql_fetch_assoc()的集合。
            另外，mysql_fetch_array()另外还有MYSQL_BOTH参数，将得到一个同时包含关 联和数字索引的数组。
    demo:
        $mysqli=new mysqli($host , $name , $password ,$dataname);   //$dataname 数据库名
        $result = $mysql->query("SELECT id, name FROM mytable");
        while ($row = $result->fetch_array()) {
            printf ("ID: %s  Name: %s", $row["id"], $row["name"]);
        }