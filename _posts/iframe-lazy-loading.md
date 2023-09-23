---
title: iframe延迟加载
slug: iframe-lazy-loading
status: publish
published_time: 2018-06-16T00:00:00.000Z
modified_time: 2021-07-28T07:47:12.857Z
layout: post
categories:
  - 折腾记录
tags:
  - JavaScript
---

> 由于原本的个人主页太丑，于是换了新的，并且准备利用一款 JS 制作 About 页，为了能让主页拥有更快的访问速度，于是便分离 Home 页和 About 页，先前是等页面完成 Load 后加载 iframe，但为了照顾流量党便采用点击后加载的方式。不懂 JS 于是踩了很多坑 ∑(￣ □ ￣)

## 流程设计

A 标签点击 -> 显示 Loading.gif 并将 iframe 标签插入指定 div 中 -> iframe 加载完成后跳转指定锚点，隐藏 Loading.gif 并触发更改 A 标签使 A 标签直接指向指定锚点，避免 iframe 重新加载

## Code

```html
<!--我就以主页的about举例吧-->

<!--Loading动画-->
<img id="about-load" src="loading.gif" style="display:nano" />
<!--初始的A标签-->
<a href="javascript:about();">About</a>
<!--要插入iframe的div-->
<div id="about-div"></div>

<script>
  //初始A标签触发的function
  function about() {
    //显示Loading动画
    document.getElementById("about-load").style.display = "block";
    //将iframe插入id为about-div的div中，并加载iframe，完成后触发aboutload的function
    document.getElementById("about-div").innerHTML = '<iframe src="about.html" onload="aboutload()"></iframe>';
  }
</script>

<script>
  //iframe加载完成后触发
  function aboutload() {
    //隐藏Loading动画
    document.getElementById("about-load").style.display = "none";
    //跳转about锚点
    location.href = "#about";
    //更换初始A标签，使其直接指向about锚点（突然发现A标签都可以直接跳转锚点，然而我还用js模拟href(=\_=)）
    document.getElementById("about1").innerHTML = '<a href="#about">About</a>';
  }
</script>
```

至此，点击加载 iframe 已完成，不需要用到 jQuery，省下了部分加载时间。为了弄这个我 Google 了好久( ＿ ＿)ノ，我果然还是菜鸡(￣ ▽ ￣～)
