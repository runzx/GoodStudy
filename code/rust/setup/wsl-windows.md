# WSL
1. setup `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`

# windosw
2. Microsoft C++ 生成工具
   - `https://visualstudio.microsoft.com/zh-hans/visual-cpp-build-tools/`
   - `https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe`

## 配置 PATH 环境变量
1. 所有工具都安装在 `~/.cargo/bin` 目录中
2. `rustup update` 来升级 Rust
3. `rustup self uninstall` 卸载 Rust
4. ## Cargo 是 Rust 的构建系统和包管理器