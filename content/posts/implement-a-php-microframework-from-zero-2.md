---
title: 从零实现一个 PHP 微框架 - PSR & Composer
slug: implement-a-php-microframework-from-zero-2
status: publish
published_time: 2020-05-09T00:00:00.000Z
modified_time: 2021-07-28T07:04:36.809Z
layout: post
categories:
  - 折腾记录
tags:
  - PHP
  - XK-PHP
  - 从零实现
---

## 什么是 PSR？

如果你不是刚入门 PHP 新手，那么你应该已经知道了 **PSR 标准**，不过为了照顾到不清楚的同学，这里还是要介绍一下。

**PSR** 即 PHP Standard Recommendations （PHP 推荐标准）的简写，由 [PHP-FIG](https://github.com/php-fig) 组织制定的 **PHP 规范**，是 PHP 开发的**实践标准**。类似于 Java 的 JSR 标准，它提供了 PHP 编程概念的标准化。目的是通过各框架作者之间的讨论制定一个标准，各框架都应遵循该规范进行开发，避免了不同框架自行发展阻碍了 PHP 的发展。

PSR 标准：[Github（英文）](https://github.com/php-fig/fig-standards/blob/master/index.md) [LearnKu（中文）](https://learnku.com/docs/psr)

## 什么是 Composer？

Composer 我应该不用介绍了吧？（逃

**Composer** 是 PHP 的一个**依赖管理工具**。类似于 NodeJS 的 NPM，是用来管理依赖包的。为什么需要依赖管理呢？当我们开发一个项目的时候，总会用到一些第三方的 Library，而不同的 Library 的安装方式都不相同，使用的方式也不相同。但是可被复用的代码集或功能集，都应该以**一致的方式编写和声明**，并且**发布到云端的仓库中**。这样能够减少使用者的了解与学习成本，并且能够通过工具来管理。而包管理器就是那个工具，通过包管理器，我们可以以一致的方式**引入 Library**，**使用 Library**，当我们不需要的时候又能**轻易的卸载不需要的 Library**。

## 自动加载

**PSR-4 自动加载规范** 是一个给 PHP 自动加载器将**命名空间映射到文件系统**的规则，PSR-4 是对 PSR-0 的补充，PSR-4 是为了解决 Composer 目录层次的问题。

写 PHP 最麻烦的就是 `require` 和 `include` 了，而有了自动加载，我们就不需要再写麻烦的 `require/include` 了，利用 `spl_autoload_register` PHP 就会在需要的时候自动加载，同时也不会遗漏或者把不必要的类加载进来，同时也不会因为大量的类而编写庞大的 `require/include` 代码。

自动加载带来的好处：

- 使用类或代码前**无需使用** `require/include`。
- 但有使用的时候才会 `require/include`，实现了**懒加载**。避免了遗漏和多余。
- **无需考虑路径**的问题，我们只需要按照规范编写代码即可。

## 初始化项目

利用 Composer 我们就无需直接编写自动加载器的规则，只需按照 PSR-4 的标准编写代码，Composer 会在我们需要的时候自动加载类和代码。

首先我们先找个一个文件夹，然后用 IDEA 打开它（你也可以用 PhpStorm，VSCode 等编辑器），然后打开终端，输入：

```bash
composer init
```

输入信息后 Composer 会在项目根目录（以下简称根目录）下生成一个 `composer.json` 的配置文件。

然后我们在根目录下新建一个 `app` 文件夹，作为框架的主要入口，同时在 `composer.json` 中添加 `autoload` 的配置项，完成后的 `composer.json` 如下：

```json
{
  "name": "syfxlin/xkphp",
  "description": "一个轻量的 PHP 框架",
  "type": "project",
  "license": "Apache 2.0",
  "authors": [
    {
      "name": "syfxlin",
      "email": "syfxlin@gmail.com"
    }
  ],
  "autoload": {
    "psr-4": {
      "App\\": "app/"
    }
  },
  "require": {}
}
```

其中 `psr-4` 指的是按 PSR-4 标准加载的命名空间，`key` 是命名空间，`value` 是路径，此时在 `app` 下的所有类如果按 PSR-4 标准进行编写，那么 Composer 就会自动加载了。

然后执行以下代码初始化 Composer 的 autoload 文件：

```bash
composer install
```

不过此时还不算完成，我们还需要写一个入口文件，作为网站的入口，这里我放到根目录下的 `public` 文件夹下，这样外部就无法直接访问根目录了。在 `public` 文件夹下建立 `index.php` 文件，内容如下：

```php
<?php
// 定义根目录
define('BASE_PATH', dirname(__DIR__) . '/');
// 引入 Composer 的 autoload
require_once __DIR__ . '/../vendor/autoload.php';
```

此时 Composer 已经可以正常工作了，我们写一个类来测试下，在 `app` 目录下新建一个 `Test` 类：

```php
<?php

namespace App;

class Test
{
    /**
     * @var string
     */
    public $name = "Test";
}
```

然后在 `index.php` 下添加 `echo (new Test())->name`，然后运行测试下：

![](images/4cd64103-63dd-4ca6-aae1-45d11aa12dd9.jpg)

## 结语

今天就简单介绍了下 Composer 和 PSR，下一篇文章不出意外就是 IoC 容器了，您可以先前往我之前的文章了解一下：
