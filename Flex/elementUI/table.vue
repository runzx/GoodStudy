// table 图片显示
<template>
  <el-table-column label="LOGO" min-width="90">
    <!-- 2关键label显示标题，slot-scope="scope"取值 -->
    <template slot-scope="scope">
      <img :src="scope.row.add_user_url" min-width="60" height="60">
    </template>
  </el-table-column>
</template>
//内容换行设定
<style>
.el-table .cell {
  white-space: pre-line;
}
</style>

 