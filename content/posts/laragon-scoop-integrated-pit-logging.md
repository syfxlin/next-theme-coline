---
title: Laragon & Scoop 集成踩坑记录
slug: laragon-scoop-integrated-pit-logging
status: publish
published_time: 2020-01-24T00:00:00.000Z
modified_time: 2021-07-28T07:10:13.104Z
layout: post
categories:
  - 折腾记录
tags:
  - Windows
  - Laragon
  - Scoop
---

作为一个 PHPer ，在开发中一定是离不开 PHP 开发环境的，在 Windows 下有各式各样的 PHP 开发环境，比如 Laravel Homestead ， XAMMP ， PHPStudy ， Laragon 等。博主我选择使用 Laragon 是因为不太喜欢虚拟机开发环境以及 Laragon 较为简洁等因素。原本是采用 Chocolatey + Laragon 管理 Windows 下的软件环境的，普通软件使用 Chocolatey 装，开发用的软件使用 Laragon ，但是在前不久换成了 Scoop ， Scoop 的管理软件的方式不再是 Chocolatey 的原生安装式了，之前的 Scoop 有提到过可以利用 Scoop 来管理 Laragon 中的开发环境，这次就完整的介绍下。

## 思路

Laragon 的开发软件都存放于 Laragon 下的 bin 目录，结构与 Scoop 的 apps 目录一样，都是一个软件放置于一个文件夹，然后在目录下放置多个版本。结构一样我们就能利用软链接或者硬链接将 Scoop 的软件目录 apps 链接到 Laragon 的 bin 目录，这样 Laragon 就能直接使用 Scoop 中安装的软件。

## 踩坑

有开发者已经写了 PowerShell 脚本了我们可以直接使用，不用再自己折腾链接

首先安装 Scoop 和 Laragon 以及该 Module （安装 Scoop 的方法见上一篇文章， Laragon 可以无脑下一步）

```powershell
inmo laragon -Scope CurrentUser
```

安装完后就可以直接使用 inla 和 unla 安装卸载 Laragon app 了

```powershell
# 安装Laragon app
inla mariadb
inla nginx@1.16.1

# 卸载Laragon app
unla apache
```

如果安装的软件在 Laragon 已经存在就需要先将 Laragon 对应软件的文件夹删除，删除后才能使用 inla 命令来安装，**另外注意** PHP 版本应选择 `NTS` 版即线程非安全版，否则可能会遇到 PHP 无法正常工作的问题。

今天又折腾了下 Scoop，又遇到了不少问题，2333，也分享出来吧。

Scoop 中安装的 PHP 中会包含一个 cli 文件夹，该文件夹是持久化的，也就是说升级了 PHP 版本后不需要再重新配置 ini 文件， cli 中的 php.ini 和 conf.d 的 custom ini 会覆盖 PHP 根目录下的 ini 文件，同时若直接用 Scoop 安装插件，如 xdebug ，则会和 Linux 中了 PHP 读取配置的方式类似，利用模块化的 custom ini 载入配置。而 Laragon 默认不是采用模块化的 ini 加载的，会导致 Laragon 不能使用 Scoop 安装的 xdebug 。那么如何让 Laragon 也使用模块化加载 ini 文件呢？其实很简单，只需要修改 `LARAGON\etc\apache2\fcgid.conf` 文件即可，在 `#Location php.ini:` 下添加以下配置，然后重启 apache 即可

```apacheconf
FcgidInitialEnv PHP_INI_SCAN_DIR "C:\Users\<you username>\scoop\apps\php-nts\current\cli;C:\Users\<you username>\scoop\apps\php-nts\current\cli\conf.d;"
```
