1. 默认GET 

2. POST ：
[HttpPost]
public ActionResult GetMemberDiscount()
{}

3. 返回 IActionResul类型

1）类名称后加Controller 变
2）类名称上加注释
  [Controller]
3) 继承 Controlle类
public class Test: Controller{
  public ActionResult Contact(){  // 右键Conatct,选add view,自动加view方法
    return View();  // 自动匹配 view
  }
}