---
title: XK-Note - 集各种神奇功能的云笔记
slug: xknote
status: publish
published_time: 2019-03-10T00:00:00.000Z
modified_time: 2021-07-28T07:20:02.636Z
layout: post
categories:
  - 折腾记录
tags:
  - PHP
  - Laravel
  - Note
thumbnail: images/c59a97e2-083f-4cb5-be6c-ab0fb3164907.jpg
---

v2 已开发完毕，您可以按照安装方式重新安装

## 前言

博主是个计科的大学生，所以经常需要将一些不太理解的代码或者经验记录下来，纸质笔记对一些经验还好，一旦涉及代码。。。，所以博主的笔记都是电子的，在弄好这个笔记时使用的是 Typora，确实非常好用，但是有个硬伤，同步不便，到机房上课的时候笔记就派不上用场，并且查看还要使用支持 Markdown 的编辑器。可谓苦不堪言，直到我在 Github 上看到了 Editor.md 这个项目，于是便开始了 Coding。

## 简介 Introduction

`XK-Note`\=`Laravel`.`Vue2.0`.`XK-Editor`; 一个由上方代码组成，集各种神奇功能的云笔记。

## 特性 Feature

- \[云存储\] 云端撰写笔记，随时保存，多端同步。
- \[跨平台\] 多平台支持，撰写查阅只需一个浏览器，无惧任何不兼容情况。
- \[响应式\] 所有页面均采用响应式设计，即使尺寸极小的设备也能保持良好的体验。
- \[在线浏览\] 拥有独立的浏览模式，查看笔记不再困扰。
- \[历史版本\] 笔记支持历史版本查看和回滚，您可以切换到任何提交过的历史版本，无惧误删除。(基于 Git)
- \[Git 同步支持\] 独有的 Git 支持，支持版本控制，无惧误操作，随时从旧版本恢复笔记。
- \[浏览器临时保存\] 独有的浏览器端保存功能，即使断网了也能安心写作，无惧任何网络波动。
- \[发布到博客\] 笔记可以在编辑完成后一键推送到 WordPress，Hexo 等博客系统。
- \[多笔记同时打开\] 笔记可以随时打开，您无需在编辑其他笔记时关闭之前开启的笔记。
- \[多用户\] 笔记主要面向个人使用，但是也支持多人同时使用，每个用户的笔记互相隔离保存，无需担心笔记泄露。
- \[导出笔记\] 支持多种导出格式，保存为 MD 文件，html 文件，由本地即时生成，无需繁琐的操作。
- \[多种模式\] 拥有多种模式，写作，预览，阅读，满足各种人的需求。
- 还有多种神奇的功能等待你的发掘。

## 演示 Demo

[XK-Note](https://note.ixk.me/)

**账号：**[demo@ixk.me](mailto:demo@ixk.me) / demo

**密码：**demodemo

## 安装 Install

> 目前 XK-Note v2 还处于测试阶段，所以可能存在 Bug，若您在使用中遇到了 Bug 或者疑似 Bug 的情况，请提交 issue 或与我取得联系，以便第一时间取得修复。

### 一键安装

- 安装依赖

```bash
# Ubuntu/Debian 其他系统请自行查阅
# 鉴于不同用户安装PHP的方法不同，这里就不写PHP的安装方法了
sudo apt-get install curl git
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
# 安装NodeJS和yarn/npm
sudo apt install npm
sudo npm i -g npm
sudo npm i -g yarn
sudo npm i -g n
sudo n stable
```

- 克隆本仓库

```bash
git clone https://github.com/syfxlin/xknote.git
```

- 复制一份`.env.example`文件，并重命名为`.env`，修改对应的信息，并关闭调试模式

```text
APP_DEBUG=false
APP_ENV=production
APP_ADMIN_ID=1 #一般来说第一位注册的用户自动升级为管理员，也就是id为1的用户，如果发现不是可以修改这个参数，改成你的id
APP_URL=you url
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=xknote
DB_USERNAME=you mysql username
DB_PASSWORD=you mysql password
MAIL_DRIVER=smtp
MAIL_HOST=smtp.example.com
MAIL_PORT=465
MAIL_USERNAME=you mail username
MAIL_PASSWORD=you main password
MAIL_ENCRYPTION=ssl
MAIL_FROM_ADDRESS=i@example.com
MAIL_FROM_NAME=XK-Note
```

- 安装

```bash
composer xknote-install
```

### 升级

> 若您是使用手动安装的话请先确认 git 是否存在 xknote-github 的 remote，如果没有，请添加后运行下方命令

```bash
composer xknote-update
```

### 手动安装

手动安装较为复杂，请前往[Github](https://github.com/syfxlin/xknote)查看

## 文档 Doc

暂无

## Github

求 star =￣ ω ￣=

## 维护者 Maintainer

XK-Note 由 [Otstar Lin](https://ixk.me/)和下列[贡献者](https://github.com/syfxlin/xknote/graphs/contributors)的帮助下撰写和维护。

> Otstar Lin -[Personal Website](https://ixk.me/)·[Blog](https://blog.ixk.me/)·[Github](https://github.com/syfxlin)

## 许可证 License

根据 Apache License 2.0 许可证开源。

## 渲染 Render

![](images/313ebb9c-e2a4-4b42-b556-4881c3865d04.jpg)

![](images/e670f590-354b-47ad-9c4a-5cbf60139944.jpg)

![](images/3068876b-d515-4fa7-b047-3b2f0db2728f.jpg)

![](images/4a8a0838-636b-4039-929c-8a9ced22c36a.jpg)
