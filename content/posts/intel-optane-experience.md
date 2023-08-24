---
title: Intel Optane 傲腾内存体验
slug: intel-optane-experience
status: publish
published_time: 2018-08-21T00:00:00.000Z
modified_time: 2021-07-28T07:45:53.632Z
layout: post
categories:
  - 折腾记录
tags:
  - 硬件
---

> 前天我拿到了购买已久的神舟 ZX6-CP5T（吐槽一下垃圾顺丰，陆运实在慢），这台笔电的存储方案是 1T 5400 转机械硬盘+16 G 傲腾内存，别问我为什么不买 SSD+机械，因为我没钱 T_T。

## Intel Optane 是什么

3 年前 Intel 与镁光合作开发 3D XPoint，这种技术拥有 DRAM 的低延迟以及 NAND 的非易失，而 Intel Optane 是目前能以最低价买到的 3D XPoint 设备。

Optane 内存的接口是 NVMe M.2，但在神舟 ZX6-CP5T 中 Optane 内存并非插在 NVMe M.2 上，而是插在 NGFF M.2 上（推测并非准确，主板上只有一个插槽标明 Optane 可使用），Optane 内存可以加速除本体外的本机硬盘（包括 SSD，机械硬盘），加速效果很明显，但也有一堆缺点。

## Optane 的缺点

> 没错，先说缺点就是要打消你们剁手的念头(｢･ω･)｢

- 装上后不能随意拔插（换插槽都不行）
- 首次安装需要重装系统
- 启用后随意进 BIOS
- 在 BIOS 中取消加速并分离磁盘 RAID 很慢
- 目前只能在 Windows 下进行加速
- 只有 7 代或以上平台能使用
- 取消加速后会让你想砸掉电脑

随意拔插 Optane 内存或者被加速的存储设备会导致电脑无法引导启动，并且需要一进行一系列操作才能恢复，具体方法请在下方寻找

取消加速后开机时间 3 分钟以上（Win10 系统）

启用加速后进入 BIOS 会导致不能加速，需要重新配置

## Optane 的优点

最大的优点就是能让 10 年前的垃圾机械也能焕发新机，对 Win10 系统的加速效果非常明显，开机从 3 分钟提升至 10 秒，动画效果不再卡顿，应用开启速度也变快许多，然后没了\_(:з」∠)\_暂时只体验到这些

## Optane 部分问题修复

### 拔插 Optane 导致无法引导

进 BIOS->第二页（Advanced）->第二个（Intel Rapid Storage Technology）->然后选择带有 Intel Optane 的选项->点击第一个（部分是 Deconcatenate，反正点就是，不用管）->选择 Are You Sure....那一行，切换至 Yes->点击最后一行（部分是 Start....，点就是，不用管），然后底下会出现一段 Warning....，这时候 BIOS 会"卡"住，等待变化，跳出刚才的页面就可以退出 BIOS 了，然后还是不能引导，重启一下即可，之后耐心等待开机，开机后打开 Optane 管理软件，点击启用，重启 2 次，第三次就能恢复正常，10 秒开机，秒响应。
