'''
爬虫学习
    html 结构分析二原则：
        1. 尽量选 唯一性 的常量标签
        2. 尽量选 接近目的 的标签
    数据层级分析原则：
        3. 父级，闭合
'''
import re
from urllib import request

class Spider(object):
    url = 'https://www.panda.tv/cate/lol'
    root_pattern = '<div class="video-info">[\s\S]*?</div>'
    name_pattern = '<span class="video-nickname" title="([\s\S]*?)">'
    # '</i>([\s\S]*?)</span>'
    number_pattern = '<span class="video-number">([\s\S]*?)</span>'
    # '<i class="video-station-num">([\s\S]*?)</i>'

    def __fetch_content(self):
        r = request.urlopen(Spider.url)
        htmls = r.read()
        htmls = str(htmls, encoding='utf8')
        return htmls

    def __analysis(self, htmls):
        root_html = re.findall(Spider.root_pattern, htmls)
        anchors = []
        for row in root_html:
            name = re.findall(Spider.name_pattern, row)
            number = re.findall(Spider.number_pattern, row)
            anchor = {'name': name, 'number': number}
            anchors.append(anchor)
        return anchors
        # print(anchors)

    def __refine(self, anchors):
        # strip() 去前后的空格，换行符
        l = lambda anchor: {
            'name':anchor['name'][0].strip(),
            'number': anchor['number'][0]
            }
        return map(l, anchors)
    
    def __sort(self, anchors):
        anchors = sorted(anchors, key=self.__sort_seed, reverse=True)
        return anchors
    def __sort_seed(self, anchor):
        r = re.findall('[0-9\.]*', anchor['number'])
        number = float(r[0])
        if '万' in anchor['number']:
            number *= 10000 
        return number

    def __show(self, anchors):
        for rank in range(0,len(anchors)):
            print('rank ',str(rank+1),' : ',anchors[rank]['name'], '   ', anchors[rank]['number'])
        # for anchor in anchors:
        #     print(anchor['name'], ' ~~~~~~ ', anchor['number'])

    def go(self, ):
        htmls = self.__fetch_content()
        anchors = self.__analysis(htmls)
        anchors = list(self.__refine(anchors))
        anchors = self.__sort(anchors)
        self.__show(anchors)

        # print(anchors)


spider = Spider()
spider.go()