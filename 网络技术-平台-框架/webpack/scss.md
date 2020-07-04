## SCSS预处理器
scss 是SASS 3.0之后的称呼  
强化 CSS 的辅助工具，增加功能：  
嵌套、变量、运算、函数...  

### 嵌套: 对css选择器的嵌套

### 变量: 存储css中信息
`$varName: 32px`  

### 函数: 计算想要结果
```scss
@function doublePx($px){
    @return $px * 2 + px;
}
$titleSize: doublePx(16);
.box {
  background-color: aquamarine;
  p {
    color: red;
  }
  &-desc {
    font-size: $titleSize;
  }
}
```
生成：  
```css
.box {
  background-color: aquamarine;
}
.box p {
  color: red;
}
.box-desc {
  font-size: 32px;
}
```
