
// adminLTE的配置文件是app.js，在页面中引入即可，
//     想修改配置，一般不应该修改配置文件，
//     而是在配置文件之前写一段js代码，通过给变量（adminLTE指定的） 
//     AdminLTEOptions  赋值，加载app.js的时候回先检测有没有该变量，优先使用该变量的配置，
//     该变量没有赋值的配置信息再使用app.js里面原有的配置。

<script>
  //变量AdminLTEOptions用来修改app.js中的配置，所有需要在app.js之前编写
  // （其实放在app.js之后也可以，看你代码结构是什么了，正常需要放在app.js之前）
  var AdminLTEOptions = {
    /*1、内菜单配置，就是消息、提醒、任务那三个的内部菜单那种*/
        //添加slimscroll到导航栏菜单，（其实在app.js之后加载该插件也可以运行的）
        // 这就需要你在每一个页面的app.js之前加载jquery.slimscroll.min.js插件，
    navbarMenuSlimscroll:true,          //是否为内菜单使用slimscroll插件
    navbarMenuSlimscrollWidth: "10px",  //内菜单的滚动条宽度
    navbarMenuHeight: "200px",          //内菜单高度
    /*2、*/
        //指定控件的折叠速度，例如box collapse/expand展开折叠 and sidebar treeview slide up/down上下滑动.。
        //此选项接受整数为毫秒，'fast', 'normal', or 'slow'
    animationSpeed: 'fast',
    /*3、指定侧边栏伸缩的控制按钮*/
    sidebarToggleSelector: "[data-toggle='offcanvas']",
    sidebarPushMenu: true,      //侧边栏伸缩使能
    sidebarSlimScroll: true,    //fixed固定布局下侧边栏滚动条使能
    sidebarExpandOnHover: true, //当侧边栏隐藏时，鼠标悬停侧边栏展开。当fixed和sidebar-mini一起使用时，不管true或false都会展开（即该配置无效）
 
    /*box*/
    enableBoxRefresh: false,
    /*Bootstrap.js的提示信息*/
    enableBSToppltip: true,//使能
    BSTooltipSelector: "[data-toggle='tooltip']",//给元素指定tooltip事件，元素中的事件必须和该事件相同
    /*给触摸设备开启快速点击体验，需要引用jquery.slimscroll.min.js*/
    enableFastclick: false,
    enableControlTreeView: true,//树视图控制，即侧边栏的点击动画效果
    enableControlSidebar: true,//右侧边栏的控制选项
    /*右侧边栏配置*/
    controlSidebarOptions: {
      //哪个按钮应该触发开/关事件
      toggleBtnSelector: "[data-toggle='control-sidebar']",
      //侧边栏选择器
      selector: ".control-sidebar",
      //运行划过内容
      slide: false//true表示在内容上层覆盖，FALSE表示推挤
    },
    enableBoxWidget: true,//允许box折叠和删除
    //框插件插件选项
    boxWidgetOptions: {
      boxWidgetIcons: {
        //Collapse icon
        collapse: 'fa-minus',
        //Open icon
        open: 'fa-plus',
        //Remove icon
        remove: 'fa-times'
      },
      boxWidgetSelectors: {
        //Remove button selector
        remove: '[data-widget="remove"]',
        //折叠按钮的选择
        collapse: '[data-widget="collapse"]'
      }
    },
    //Direct Chat plugin options
    directChat: {
      //默认启用直接聊天
      enable: true,
      //打开和关闭聊天联系人窗格的按钮
      contactToggleSelector: '[data-widget="chat-pane-toggle"]'
    },
    //在这里可以自己额外添加新的颜色
    colors: {
      lightBlue: "#3c8dbc",
      red: "#f56954",
      green: "#00a65a",
      aqua: "#00c0ef",
      yellow: "#f39c12",
      blue: "#0073b7",
      navy: "#001F3F",
      teal: "#39CCCC",
      olive: "#3D9970",
      lime: "#01FF70",
      orange: "#FF851B",
      fuchsia: "#F012BE",
      purple: "#8E24AA",
      maroon: "#D81B60",
      black: "#222222",
      gray: "#d2d6de"
    },
    //这里是修改响应式的分界点
    screenSizes: {
      xs: 480,
      sm: 768,
      md: 992,
      lg: 1200
    }
  };
</script>
<script src="dist/js/app.js"></script>