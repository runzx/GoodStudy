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
    url = 'https://movie.douban.com/explore#!type=movie&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=20&page_start=0'
    '''
    root_pattern0 = '<a class="item" target="_blank" href="https://movie.douban.com/subject/26951951/?tag=热门&amp;from=gaia_video">
        
            <div class="cover-wp" data-isnew="false" data-id="26951951">
                <img src="https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2500138181.jpg" alt="小戏骨：红楼梦之刘姥姥进大观园" data-x="1115" data-y="1767">
            </div>
            <p>
                

                小戏骨：红楼梦之刘姥姥进大观园

                
                    <strong>9.2</strong>
                
            </p>
        </a>'
    '''
    root_pattern = '<a class="item" target="_blank" href=[\s\S]*?</a>'

    def __fetch_content(self):
        r = request.urlopen(Spider.url)
        htmls = r.read()
        htmls = str(htmls, encoding='utf8')
        return htmls

    def __analysis(self, htmls):
        root_html = re.findall(Spider.root_pattern, htmls)
        print(root_html[0])
        a = 1

    def go(self, ):
        htmls = self.__fetch_content()
        self.__analysis(htmls)


spider = Spider()
spider.go()