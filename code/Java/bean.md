## 一种规范，表达实体和信息的规范，便于封装重用

    1、所有属性为private  
    2、提供默认构造方法  
    3、提供getter和setter  
    4、实现serializable接口

PO (persistence object):  

    用于持久化时(例如保存到数据库或者缓存);  
VO (value object):  

    用于前端展示使用(例如放置到JSP中解析或者给前端传递数据)  
DTO (data transfer object):  

    用于接口互相调用返回,数据传输(例如很多接口调用返回值或消息队列内容);

## POJO有个叫Josh MacKenzie人觉得，EJB太复杂了，完全没必要每次都用，
    所以发明了个POJO  
    POJO是普通的javabean，什么是普通，就是和EJB对应的。      
    总之，区别就是，你先判断是否满足javabean的条件，然后如果再实现一些要求，满足EJB条件就是EJB，否则就是POJO。

## JavaBean是公共Java类
    有一个public默认构造器（例如无参构造器,）  
    属性设置成private,通过public的get，set方法访问，get，set方法与属性名也要对应  
      private name;  
      public String getName(){} // N大写  
      public String setName(){}  
    需要序列化。这个是框架，工具跨平台反映状态必须的  
