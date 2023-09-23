---
title: "VSCode Java输出中文乱码问题解决[更新]"
slug: vscode-java-output-chinese-garbled-problem-solving
status: publish
published_time: 2020-03-13T00:00:00.000Z
modified_time: 2021-07-28T07:08:30.684Z
layout: post
categories:
  - 折腾记录
tags:
  - Java
  - VSCode
---

重写了下这篇文章，官方默认的配置可以正常输出中文，但是输入还是会造成乱码，经过了不少时间的尝试，终于把输入和输出乱码的问题解决了。

本文适用于 Windows，Linux 中应该不会出现这种问题。

首先先说明下此方法需要更改 VSCode Java 插件的 launcher.bat 启动文件，可能会在后续的使用中带来问题。

## 前言

前几天由于要写 OJ 题我又打开了尘封已久的 VSCode Java 工作区，使用过程中遇到了中文乱码的问题，照理说应该是不会出现这种问题的，因为我当初在配置 Java 环境的时候就已经解决了中文乱码的问题。然后一直懒得修，直到今天有空。

博主我原先是将 JDK 的编码和 Java 文件的编码都设置为 GBK，这样在运行的时候就不会出现中文乱码的问题，不知从那个版本开始这种方式就不可行了，于是只能重新的测试。

## 方案

首先，先创建一个项目，然后创建一个 Java 文件用于测试，注意：该文件的编码应使用 UTF-8，上传到 Linux 也方便，不用再批量改编码。

```java
import java.util.Scanner;

public class App {
    public static void main(String[] args) throws Exception {
        Scanner in = new Scanner(System.in);
        System.out.println("start-1");
        System.out.println("中文");
        System.out.println("start-2");
        System.out.println(in.nextLine());
        System.out.println("end");
        in.close();
    }
}
```

然后创建一个 `launch.json` 的启动文件，操作方法如下：

![](images/515b652c-ee23-4223-8041-76f4bf172640.jpg)

正常情况下 VSCode 会自动生成一个可用的 launch.json 文件，直接使用此配置可以正常输出中文，但是无法正常输入中文，如下：

![](images/a5b831fb-6908-4cab-a917-cae1519595d1.jpg)

此时，我们将修改下 launch.json 的配置，增加 `"encoding": "GBK"` 字段，如下：

```json
{
  // 使用 IntelliSense 了解相关属性。
  // 悬停以查看现有属性的描述。
  // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "java",
      "name": "Debug (Launch) - Current File",
      "request": "launch",
      "mainClass": "${file}",
      // 新增 encoding
      "encoding": "GBK"
    },
    {
      "type": "java",
      "name": "Debug (Launch)-App<Encoding>",
      "request": "launch",
      "mainClass": "App",
      "projectName": "Encoding",
      // 新增 encoding
      "encoding": "GBK"
    }
  ]
}
```

此时再运行你会发现，输入和输出都不行了，此时不要担心，请接着进行以下配置即可。

下一步就需要修改 `launcher.bat` 文件了，请在修改前备份下该文件。`launcher.bat` 位于 VSCode Java 插件目录下的 `scripts` 目录，也可以按住 Ctrl 然后点击之前启动时 VSCode 的启动脚本的 launcher.bat 直接跳转到该文件。

![](images/be915c1c-ed38-4708-8512-338357fbb9d7.jpg)

打开该文件后将 `@chcp.com 65001 > NUL` 修改成 `@chcp.com 936 > NUL`

![](images/53b9eea0-0629-4a6c-8908-82ece98f06ea.jpg)

然后再次运行，你就可以看到输出和输入都正常了

![](images/26fe1026-3307-429a-a12a-6c2a93b215fb.jpg)

## 结语

现在已经我不写需要用 Scanner 的项目了（其实是不用写 OJ 题了）不过看到该文章有挺多人浏览的，大家都遇到了这个问题，之前写的确实比较水，并没有解决输入乱码的问题，这次更新了下，希望此篇能帮助到其他同学。
