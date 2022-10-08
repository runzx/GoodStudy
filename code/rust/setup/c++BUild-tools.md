# Microsoft Visual C++ Build Tools 2015
0. Rust 1.2 的发布，我们引入了对 MSVC 工具链的初始支持。 
   - 之后，随着支持的成熟，我们最终将其作为 Windows 用户的默认选择
1. `http://go.microsoft.com/fwlink/?LinkId=691126`下载 visualcppbuildtools_full.exe
2. 默认安装
3. 切换到 GNU 工具链: `rustup toolchain install stable-x86_64-pc-windows-gnu`

## Microsoft Visual C++ 14.0 

1. Visual C++ 14.0编译器的独立版（standalone），而不需要安装整个Visual Studio
2. `https://visualstudio.microsoft.com/zh-hans/visual-cpp-build-tools/`
3. “使用C++的桌面开发”并确保安装详细信息的前两项勾选，再单击“修改”按钮，将进行自动下载、自动安装之。
   1. MSVC v142 - VS 2019 C++ x64/x86生成工具
   2. Windows10 SDK 
