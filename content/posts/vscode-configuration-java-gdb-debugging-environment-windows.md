---
title: "VSCode配置Java调试环境[Windows]"
slug: vscode-configuration-java-gdb-debugging-environment-windows
status: publish
published_time: 2018-11-06T00:00:00.000Z
modified_time: 2021-07-28T07:39:31.085Z
layout: post
categories:
  - 折腾记录
tags:
  - Java
  - Develop
  - VSCode
---

> 其实 Java 环境我很早就开始配置了，但是一直有问题，今天又手贱尝试了一下，没想到就成功了，即时更新博文是我的习惯 （防止被打死，赶紧逃(/ω＼)

# 环境准备

## JDK

下载 [JDK](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) 并进行安装，我比较推荐安装 Java SE8，另外下载时记得点上 Accept License Agreement，否则点击不会反应

![](images/b1e9e690-b4f0-44ee-9918-f52dad7a208e.jpg)

打开 PowerShell 或者 CMD，输入 `java -version` 和 `javac -version`如果没提示错误信息就代表 JDK 配置成功

![](images/92bcd898-9b75-40f5-856e-79f7e30ddf3f.jpg)

正常情况下 JDK 安装时是不会自动配置环境变量的，所以`javac -version`一般都会提示错误，这时只需将 JDK 目录下的 bin 目录添加到环境变量即可，具体操作请自行搜索或者查看[VSCode 配置 C/C++ GDB 调试环境\[Windows\]](https://blog.ixk.me/vscode-configuration-Cpp-gdb-debugging-environment-windows.html)

## VSCode

![](images/521f4874-80e1-4009-9efc-6bdedd7452df.jpg)

按下 `Shift+Ctrl+P`进入命令面板

新版的 VSCode Java 插件已经可以直接创建项目，不再需要使用 Eclipse New Java Project 这个插件来创建项目了。

![](images/febe0858-9bf5-4cc8-9d2c-8b587fca730d.jpg)

![](images/479b760b-11ca-4a56-91ae-f97f12d626c4.jpg)

![](images/6ebe988f-1810-4181-9743-18453c8ec918.jpg)

![](images/445ef0a6-e90b-4edb-bfbe-e5a66fedaa7c.jpg)

然后在 src 文件夹内创建一个 `HelloWorld.java`文件

```java
class hello {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}
```

然后点击`F5`，就会发现在父文件夹下多了一个`.vscode`文件夹，里面有一个`launch.json`文件，不进行配置的话也可以进行运行，但你是否发现没有出现界面，这时还需要修改一个值

![](images/7cf49f9e-4741-4879-a259-a1a7413265eb.jpg)

这时再次点击`F5`就可以正常调试了

#### 2019-06-29 更新

VSCode 的 Java 插件包现在似乎添加了自动安装 JDK 的功能和一些常用函数的补全

## 相关文章
