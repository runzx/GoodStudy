# tree view 树视图

1. 视图容器 View Container 左边栏  

```json
{
  "viewsContainers": {
    "activitybar": [
      {
        "id": "package-explorer",
        "title": "Package Explorer",
        "icon": "image/redis-icon-0.png"
      }
    ]
  },
  "views": {
    "package-explorer": [
      {
        "id": "targetTree1",
        "name": "Targets1"
      },
      {
        "id": "targetTree2",
        "name": "Targets2"
      }
    ]
  }
  // 只有一个view时，左栏 标题： title +':' + name 
}
```
