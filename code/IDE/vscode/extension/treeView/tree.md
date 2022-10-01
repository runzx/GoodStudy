# tree view 树视图

1. 视图容器 View Container 左边栏

```json
// package.json

{
  // 激活 插件 方式
  "activationEvents": [
    "onView:redisTree"	// 视图的ID
    // "onCommand:redis-stream-2022.helloWorld"
  ],

  "contributes": {
    "viewsContainers": {
      // 左侧栏 tree View Container
      "activitybar": [
        {
          "id": "redis-stream",	// 视图容器的ID
          "title": "Redis Explorer",
          "icon": "image/redis-icon-0.png"
        }
      ]
    },
    "views": {
      "redis-stream": [	// 视图容器的ID
        // title
        {
          "id": "redisTree",	// 视图的ID
          "name": "Stream"
          // "when": "explorer"		// 显示在资源管理器侧边栏
        }
      ]
    }
    // 只有一个view时，左栏 标题： title +':' + name -> 'REDIS EXPLORER:STREAM'
  },
  // 菜单
  "menus": {
    // 视图标题 的操作。显示的操作,使用"group":"navigation", 剩余的二级操作则出现在...菜单中。
    "view/title": [
      {
        "command": "nodeDependencies.refreshEntry",
        "when": "view == nodeDependencies",
        "group": "navigation"
      },
      {
        "command": "nodeDependencies.addEntry",
        "when": "view == nodeDependencies"
      }
    ],
    // 视图项 的操作。显示的操作,使用"group":"inline"
    "view/item/context": [
      {
        "command": "redis-stream.connection.refresh",
        "when": "view == redisTree && viewItem == connection",
        "group": "inline@1"	// 第2位置
      },
      {
        "command": "redis-stream.connection.terminal",
        "when": "view == redisTree && viewItem == connection",
        "group": "inline@0"	// 第1位置
      }
    ]
  },

  "commands": [
    {
      "command": "nodeDependencies.refreshEntry",
      "title": "Refresh",
      "icon": {
        "light": "resources/light/refresh.svg",
        "dark": "resources/dark/refresh.svg"
      }
    },
    {
      "command": "nodeDependencies.addEntry",
      "title": "Add"
    },
    {
      "command": "nodeDependencies.editEntry",
      "title": "Edit",
      "icon": {
        "light": "resources/light/edit.svg",
        "dark": "resources/dark/edit.svg"
      }
    },
    {
      "command": "nodeDependencies.deleteEntry",
      "title": "Delete"
    }
  ]
}
```
