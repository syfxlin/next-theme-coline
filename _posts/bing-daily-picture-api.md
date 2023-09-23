---
title: Bing每日一图API
slug: bing-daily-picture-api
status: publish
published_time: 2018-06-27T00:00:00.000Z
modified_time: 2021-07-28T07:46:52.816Z
layout: post
categories:
  - 折腾记录
tags:
  - PHP
  - Lab
  - Api
---

## 什么是 Bing 每日一图

相信大家在访问 Bing 搜索的时候都会看到非常漂亮的背景图，由于 Bing 的背景图每天都会变，于是称为 Bing 每日一图。

## 调用方法

此 API 只支持**https 调用**，国外地区访问使用 CF 节点。

所有参数均**仅适用于以 GET 方式**进行请求

可**直接插入**img 标签中

### 请求地址：

https://lab.ixk.me/api/bing/

### 调用参数：

<table>
  <tbody>
    <tr>
      <td>
        <strong>参数代码</strong>
      </td>
      <td>
        <strong>参数含义</strong>
      </td>
      <td>
        <strong>可用参数</strong>
      </td>
    </tr>
    <tr>
      <td>rand</td>
      <td>是否随机显示最近8天内的图片</td>
      <td>true or&nbsp;Do not fill in</td>
    </tr>
    <tr>
      <td>day</td>
      <td>显示指定的最近图片</td>
      <td>-1，0，1，2，3，4，5，6，7(0为今天，-1为昨天)</td>
    </tr>
    <tr>
      <td>size</td>
      <td>指定获取图片大小</td>
      <td>
        详见下方<strong>可用分辨率</strong>
      </td>
    </tr>
    <tr>
      <td>info</td>
      <td>获取图片基础信息（json格式）</td>
      <td>true or&nbsp;Do not fill in</td>
    </tr>
  </tbody>
</table>

以上所有参数均非必要，默认参数为 rand=false，day=0，size=1920x1080，info=false

### 可用分辨率：

> - 1920×1080
> - 1366×768
> - 1280×768
> - 1024×768
> - 800×600
> - 800×480
> - 768×1280
> - 720×1280
> - 640×480
> - 480×800
> - 400×240
> - 320×240
> - 240×320
> - 注：中间的 x 为英文字母 x

## 调用示例：

**默认调用：**

不带任何参数调用 https://lab.ixk.me/api/bing/

---

**Info 调用：（例）**

调用链接：https://lab.ixk.me/api/bing?info=true

```json
{
  "title": "Concrete dinosaurs along Old Route 66 in Holbrook, Arizona (© Gary Warnimont/Alamy)",
  "url": "https://www.bing.com/az/hprichbg/rb/ConcreteDinosaurs_EN-US9038296644_1920x1080.jpg",
  "link": "http://www.bing.com/search?q=route+66&form=hpcapt&filters=HpDate:%2220180627_0700%22",
  "time": "20180627",
  "api_author": "Otstar",
  "api_author_link": "https://www.ixk.me"
}
```

---

**随机调用：**

调用链接：https://lab.ixk.me/api/bing?rand=true

---

## Code

```php
<?php
//判断是否随机调用
if ($\_GET\['rand'\] === 'true') {
    $gettime = rand(-1, 7);
} else {
    //若不为随机调用则判断是否指定日期
    $gettimebase = $\_GET\['day'\];
    if (empty($gettimebase)) {
        $gettime = 0;
    } else {
        $gettime = $gettimebase;
    }
}
//获取Bing Json信息
$json\_string = file\_get\_contents('https://www.bing.com/HPImageArchive.aspx?format=js&idx=' . $gettime . '&n=1');
//转换为PHP数组
$data = json\_decode($json\_string);
//提取基础url
$imgurlbase = "https://www.bing.com" . $data->{"images"}\[0\]->{"urlbase"};
//判断是否指定图片大小
$imgsizebase = $\_GET\['size'\];
if (empty($imgsizebase)) {
    $imgsize = "1920x1080";
} else {
    $imgsize = $imgsizebase;
}
//建立完整url
$imgurl = $imgurlbase . "\_" . $imgsize . ".jpg";
//获取其他信息
$imgtime = $data->{"images"}\[0\]->{"startdate"};
$imgtitle = $data->{"images"}\[0\]->{"copyright"};
$imglink = $data->{"images"}\[0\]->{"copyrightlink"};
//判断是否只获取图片信息
if ($\_GET\['info'\] === 'true') {
    echo "{title:" . $imgtitle . ",url:" . $imgurl . ",link:" . $imglink . ",time:" . $imgtime . "api author:Otstar,api author link:https://www.ixk.me" . "}";
} else {
    //若不是则跳转url
    header("Location: $imgurl");
}
```
