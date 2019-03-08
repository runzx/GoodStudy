// 访问主模块

// 当 Node.js 直接运行一个文件时， require.main 会被设为它的 module。 这意味着可以通过 require.main === module 来判断一个文件是否被直接运行：
// 因为 module 提供了一个 filename 属性（通常等同于 __filename），所以可以通过检查 
  // require.main.filename 来获取当前应用程序的入口点。

  // 直接运行此文件，require.main === module 为true
  if (require.main === module) {
    wu.commandExecute(splitJs, "Split and beautify weapp js file.\n\n<files...>\n\n<files...> js files to split and beautify.");
  }  