# windows git-bash
1. `curl https://sh.rustup.rs -sSf | sh`
   1. 安装visual studio 时退出不用安装，只用装环境
   2. C:\Users\zhaixiang\.rustup, C:\Users\zhaixiang\.cargo 
   3. 1) Proceed with installation (default)
      1. Default host triple? [x86_64-pc-windows-msvc]
         1. x86_64-pc-windows-gnu

   4. stable-x86_64-pc-windows-msvc installed - rustc 1.64.0 (a55dd71d5 2022-09-19)
   5. rustc -V, cargo -V
2. 使用 gnu 编译包
   1. `rustup uninstall toolchain stable-x86_64-pc-windows-msvc`

   2. `rustup toolchain install stable-x86_64-pc-windows-gnu`

   3. `rustup default stable-x86_64-pc-windows-gnu`

3. `cargo new world_hello` 创建新项目
