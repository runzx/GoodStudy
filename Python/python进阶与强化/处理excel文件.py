'''处理excel
    openpyxl 支持07/10/13版本Excel的
'''
# 读excel文件
import xlrd
book = xlrd.open_workbook('11cost.xlsx')
'''
    book.sheet_names() 返回所有表名
    sheet = book.sheet_by_name(sheet_name) 通过表名取表数据
    sheet.row(0) 取第1行数据
    sheet.nrows 总行数 A row index is in range(thesheet.nrows).
    sheet.cell(0,0) 取(1,A)数据
        cell_value(rowx, colx)
            Value of the cell in the given row and column.
        cell_type(rowx, colx)
            XL_CELL_EMPTY	0	empty string u''
            XL_CELL_TEXT	1	a Unicode string
            XL_CELL_NUMBER	2	float
            XL_CELL_DATE	3	float
            XL_CELL_BOOLEAN	4	int; 1 means TRUE, 0 means FALSE
            XL_CELL_ERROR	5	int representing internal Excel codes; for a text representation, refer to the supplied dictionary error_text_from_code
            XL_CELL_BLANK	6	empty string u''. Note: this type will appear only when open_workbook(..., formatting_info=True) is used.

    sheet.put_cell(row,col,ctype,value)     新增一个单元数据
'''

# 取出一张表 通过序号
sheet = book.sheet_by_index(0)
sheet.put

# 写excel文件， 用法 同上 支持MS Excel 97/2000/XP/2003 ,不能写入超过65535行、256列的数据
import xlwt
from datetime import datetime
# 设置格式
style0 = xlwt.easyxf(
    'font: name Times New Roman, color-index red, bold on',
    num_format_str='#,##0.00')
style1 = xlwt.easyxf(num_format_str='D-MMM-YY')

wbook = xlwt.Workbook()
ws = wbook.add_sheet('A test Sheet')
ws.write(0,0,1.5,style0)
ws.write(1, 0, datetime.now(), style1)
ws.write(2, 0, 1)
ws.write(2, 2, xlwt.Formula("A3+B3"))
wb.save('example.xls')

'''
得益于辛勤劳作的python大神们，处理excel已经有大量python包，主流代表有：

xlwings：简单强大，可替代VBA
openpyxl：简单易用，功能广泛
pandas：使用需要结合其他库，数据处理是pandas立身之本
win32com：不仅仅是excel，可以处理office;

Xlsxwriter：丰富多样的特性，直接创造一份美观大方的excel，代码即一切；

DataNitro：作为插件内嵌到excel中，可替代VBA，在excel中优雅的使用python
xlutils：结合xlrd/xlwt，老牌python包，需要注意的是你必须同时安装这三个库

作者：zx576
链接：http://www.jianshu.com/p/be1ed0c5218e
來源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
'''