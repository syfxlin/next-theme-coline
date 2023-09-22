---
title: "VSCode配置PHP调试环境[Windows]"
slug: vscode-configuration-php-gdb-debugging-environment-windows
status: publish
published_time: 2018-09-06T00:00:00.000Z
modified_time: 2021-07-28T07:43:10.977Z
layout: post
categories:
  - 折腾记录
tags:
  - PHP
  - Develop
  - VSCode
---

> 没有灵感,连续水一波 (逃

> 其实是我刚配好,比较健忘,以后重新配置的时候方便

# 环境准备

## XAMPP&XDebug

下载 [XAMPP](https://www.apachefriends.org/xampp-files/7.2.9/xampp-win32-7.2.9-0-VC15-installer.exe) 并安装记好安装路径,后面会用到

打开 XAMPP 开启 Apache,获取 PHP info,进入 PHP info 页面后直接全选复制,全部复制到 [XDebug 检测网址](https://xdebug.org/wizard.php) 中的输入框中,点击后网站会分析出你当前的 php 环境最适合的 xdebug 版本,并给出下载链接,下载完成后，将该文件复制到 php 的扩展目录中,即安装目录中的 ext 文件夹下

打开 XAMPP,进行配置 php.ini

![](images/0658a702-f312-4996-9bdd-cebec16d71dd.jpg)

编辑 php.ini,在最下方添加以下代码,路径记得更改

```ini
[xdebug]
zend_extension = "L:\XAMPP\php\ext\php_xdebug-2.6.1-7.2-vc15.dll"
xdebug.remote_enable = 1
xdebug.remote_autostart = 1
```

## VSCode

![](images/b188376f-4cfa-419c-b391-4397f5107ef4.jpg)

# 配置 VSCode

![](images/6e67f371-17c8-45bc-bca1-74af06110bc9.jpg)

![](images/cfa26d47-c72c-4d82-98a4-e663d67d0337.jpg)

![](images/0bde6720-9095-4dd4-b774-929d1a61897e.jpg)

找到 XAMPP 的网站文件夹,即 htdocs 文件夹,在 htdocs 下创建你的工作区(文件夹),然后在 VSCode 中打开此文件夹,然后创建一个测试用的 PHP 文件

```php
<?php
$a = 5;
$b = 5;
$c = 5;
$a = $a + $b;
$a = $a + $c;
echo $a;
?>
```

接着照着以下操作配置

![](images/5a7a9396-d3b1-402d-9471-fb1ff110c79a.jpg)

![](images/e55243c5-63a3-4551-beb3-93cb26318fb2.jpg)

#### 至此 VSCode PHP 调试环境就配置完成了,接下来就是重(坑)磅(逼)的断点调试技巧

## 断点调试

返回刚创建的 php 文件

![](images/77df43ba-ef39-40db-bfb4-f966357cb9ab.jpg)

![](images/c74617fe-bd66-462d-a02f-86f9b30000d7.jpg)

![](images/b223401b-c693-4966-a758-fd803bacb67f.jpg)

![](images/fe91955d-98fc-44e9-b9ac-b626792165d7.jpg)

![](images/a152725d-70fa-4fbc-82c2-482f1e50bdb3.jpg)

#### 开始愉快的调试吧 (逃
