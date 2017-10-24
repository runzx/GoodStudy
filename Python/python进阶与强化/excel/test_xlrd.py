#coding=utf-8
#######################################################
#filename:test_xlrd.py
#author:defias
#date:xxxx-xx-xx
#function：读excel文件中的数据
#######################################################
import xlrd
#打开一个workbook
workbook = xlrd.open_workbook('E:\\Code\\Python\\testdata.xls')
#抓取所有sheet页的名称
worksheets = workbook.sheet_names()
print('worksheets is %s' %worksheets)
#定位到sheet1
worksheet1 = workbook.sheet_by_name(u'Sheet1')
"""
#通过索引顺序获取
worksheet1 = workbook.sheets()[0]
#或
worksheet1 = workbook.sheet_by_index(0)
"""
"""
#遍历所有sheet对象
for worksheet_name in worksheets:
worksheet = workbook.sheet_by_name(worksheet_name)
"""
#遍历sheet1中所有行row
num_rows = worksheet1.nrows
for curr_row in range(num_rows):
row = worksheet1.row_values(curr_row)
print('row%s is %s' %(curr_row,row))
#遍历sheet1中所有列col
num_cols = worksheet1.ncols
for curr_col in range(num_cols):
col = worksheet1.col_values(curr_col)
print('col%s is %s' %(curr_col,col))
#遍历sheet1中所有单元格cell
for rown in range(num_rows):
for coln in range(num_cols):
cell = worksheet1.cell_value(rown,coln)
print cell
"""
#其他写法：
cell = worksheet1.cell(rown,coln).value
print cell
#或
cell = worksheet1.row(rown)[coln].value
print cell
#或
cell = worksheet1.col(coln)[rown].value
print cell
#获取单元格中值的类型，类型 0 empty,1 string, 2 number, 3 date, 4 boolean, 5 error
cell_type = worksheet1.cell_type(rown,coln)
print cell_type
"""