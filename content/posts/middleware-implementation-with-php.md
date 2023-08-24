---
title: "中间件实现 [PHP]"
slug: middleware-implementation-with-php
status: publish
published_time: 2020-03-29T00:00:00.000Z
modified_time: 2021-07-28T07:07:47.809Z
layout: post
categories:
  - 折腾记录
tags:
  - PHP
  - Middleware
---

## 中间件是什么？

要实现中间件，首先就需要知道中间件是什么。中间件是很多 PHP 框架中都提供的功能，中间件提供了一种方便的机制过滤进入应用程序的 HTTP 请求。这么说可能会比较抽象，我们就举个具体的例子吧。

比如某个商城应用，当用户把商品加入购物车的时候和购买的时候，我们需要验证用户是否已经登录，传统的方式是在执行每个业务之前判断是否登录，如下演示代码：

```php
<?php
function addToCart() {
    if (!isLogin()) {
        return "用户未登录";
    }
    // ... 添加到购物车操作
    return "添加到购物车成功";
}

function buy() {
    if (!isLogin()) {
        return "用户未登录";
    }
    // ... 购买操作
    return "购买成功";
}

function entry() {
    // addToCart or buy
}
```

可以看到，当需要验证用户的时候就需要写重复的代码，那么我们为什么不把验证的部分另外抽出来呢，如下：

```php
<?php
function addToCart() {
    // ... 添加到购物车操作
    return "添加到购物车成功";
}

function buy() {
    // ... 购买操作
    return "购买成功";
}

function entry() {
    if (!isLogin()) {
        return "用户未登录";
    }
    // addToCart or buy
}
```

可以看到这样遇到相同需要验证的时候就不再需要写重复的验证代码了，而这种做法其实就是中间件的思想，抽离出来的验证登录就是一个中间件。有了中间件我们就可以这些操作，比如权限验证、CSRF 验证等等都写在中间件里，然后通过使用不同的中间件组合不仅能够实现需求还降低了代码的耦合度。

## 中间件

比较常见的中间件模型有两种，一种是洋葱模型，一种是切面模型，其实这两个可以看成是一种，不过分开来比较好理解 2333。

![](images/2752770a-2c5b-41dc-96d6-75cff97a7286.jpg)

左：洋葱模型，右：切面模型

这两个图看起来是不是有点吓人，切面模型其实还比较好理解，洋葱模型看起来就有点懵了，是不是有点像函数的嵌套调用 `Middleware2(Middleware1(App()))`？其实这并不是这样的，因为函数的嵌套调用是先执行内层的函数，然后才会执行外层的函数。若你经常使用回调函数方式的编程，那么你就能发现这其实像闭包嵌套：

```php
<?php
function middleware2() {
    echo "Start Middleware2\n";
    middleware1();
    echo "End Middleware2\n";
}

function middleware1() {
    echo "Start Middleware1\n";
    app();
    echo "End Middleware1\n";
}

function app() {
    echo "App\n";
}

function entry() {
    middleware2();
}

entry();

// Start Middleware2
// Start Middleware1
// App
// End Middleware1
// End Middleware2
```

## 优雅的实现

可以看到上面的实现是写死的，如果要增加或者动态使用中间件就极为麻烦，所以我们需要对其进行改造，改造成可以动态调用的中间件。这也是我在 [XK-PHP](https://github.com/syfxlin/xkphp) 中使用的方法。

```php
<?php
// 中间件
class Authenticate
{
    public function handle($request, Closure $next)
    {
        echo "Start 登录\n";
        $response = $next($request);
        echo "End 登录\n";
        return $response;
    }
}

class SimpleMiddleware
{
    public function handle($request, Closure $next)
    {
        echo "Start SimpleMiddleware\n";
        $response = $next($request);
        echo "End SimpleMiddleware\n";
        return $response;
    }
}

// App
class App
{
    public function run($request)
    {
        return "App-$request\n";
    }
}

// 中间件处理器
$middlewares = [
    Authenticate::class,
    SimpleMiddleware::class
];

$next = function ($request) {
    return (new App)->run($request);
};

foreach ($middlewares as $middleware) {
    $next = function ($request) use ($next, $middleware) {
        return (new $middleware)->handle($request, $next);
    };
}

$response = $next("request");

echo $response;

// Start SimpleMiddleware
// Start 登录
// End 登录
// End SimpleMiddleware
// App-request
```

这段代码如果不熟悉闭包的看起来可能有点懵，不过仔细理解下就很简单了。

在中间件的类中有一个 `handle` 函数用于处理请求或响应，外部向该函数传入了一个 `$next` 闭包，这个闭包其实就是后续的 `中间件` 和 `App` 的打包成的 `闭包`。通过循环就可以不断的组成新的闭包，合并所有中间件后就可以执行了，此时只需要执行最终的闭包，最终的闭包会不断的嵌套调用 `$next` 闭包，直到最后的 `App` 其实就是个递归的过程。不过我这里干讲也无法讲清楚，最好还是要利用 IDE 一步一步调试才能更好的理解。

## 更优雅的实现

第二个实现虽然已经很好了，但是并不符合 [PSR-15](https://learnku.com/docs/psr/psr-15-request-handlers/1626) 的标准，所以如果要更优雅的方式来实现中间件的话需要按照 PSR-15 的标准来实现，这样就可以复用 PSR-15 的中间件，并且也符合 PSR-7 消息接口的规范。具体的代码这里就不贴了，请移步 [Github](https://github.com/syfxlin/blog-code) 查看。
