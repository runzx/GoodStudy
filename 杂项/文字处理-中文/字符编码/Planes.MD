# Planes

1. In addition to scripts, there is another way that Unicode organizes its characters: planes.
   除了脚本之外，Unicode 还可以通过另一种方式组织其字符： planes 。

2. Instead of grouping them by type, it checks the code point value:  
   | Plane | Range |
   | --- | --- |
   | 0 U+0000 | U+FFFF |
   | 1 U+10000 | U+1FFFF |
   | 2 U+20000 | U+2FFFF |
   | … | … |
   | 14 U+E0000 | U+EFFFF |
   | 15 U+F0000 | U+FFFFF |
   | 16 U+100000 | U+10FFFF |

3. The first is special, it’s called Basic Multilingual Plane, or BMP, and contains most of the modern characters and symbols, from the Latin, Cyrillic, Greek scripts.  
   第一个是特殊的，它称为 Basic Multilingual Plane 或 BMP ，其中包含来自拉丁语，西里尔语和希腊语脚本的大多数现代字符和符号。

4. The other 16 planes are called astral planes. Worth noting that planes 3 to 13 are currently empty.
   其他 16 个平面称为星体平面 。 值得注意的是，planes 3 至 13 目前是空的。

5. The code points contained in astral planes are called astral code points.
   星体平面中包含的代码点称为星体代码点 。

6. Astral code points are all points higher than U+10000.
   所有星体代码点均高于 U+10000 。

7. Unicode 将每个字符映射到称为代码点的特定代码。 代码点采用 U+<hex-code> ，范围从 U+0000 到 U+10FFFF 。

8. Unicode 定义了不同的字符编码 ，最常用的是 UTF-8，UTF-16 和 UTF-32。
