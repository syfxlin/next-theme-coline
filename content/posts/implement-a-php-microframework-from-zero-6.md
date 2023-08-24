---
title: 从零实现一个 PHP 微框架 - 初始化请求
slug: implement-a-php-microframework-from-zero-6
status: publish
published_time: 2020-07-25T00:00:00.000Z
modified_time: 2021-07-28T06:59:55.788Z
layout: post
categories:
  - 折腾记录
tags:
  - PHP
  - XK-PHP
  - 从零实现
---

## 前言

更新一波文章。

这次的内容相对简单点，初始化请求的过程包括封装 `$_GET` `$_POST` 等关联数组到 Request 对象中，用于后续流程的使用，以及从封装 Request 到路由之前的这段过程。

## 构造 Request

构造 Request 是通过 `Application.dispatchToEmit` 里的 `$request = $this->make(Request::class)` 初始化的，`make` 方法会通知容器初始化 `Request` 对象。

```php
<?php
protected function dispatchToEmit(): void
{
    // 获取请求
    $request = $this->make(Request::class);

    // 处理
    $response = $this->make(RouteManager::class)->dispatch($request);

    // 发送响应
    $response->send();
}
```

既然是通过容器来初始化的，那么就需要绑定该对象到容器，`Request` 对象是通过 `RequestProvider` 进行绑定的：

```php
<?php

namespace App\Providers;

use App\Http\Request;

class RequestProvider extends Provider
{
    public function register(): void
    {
        $this->app->singleton(
            Request::class,
            function () {
                return Request::make();
            },
            'request'
        );
    }
}
```

### Request::make

从上面的代码可以看到初始化 `Request` 是通过 `Request::make()` 的静态工厂方法构造的：

```php
<?php
public static function make(
    array $server = null,
    array $query = null,
    array $body = null,
    array $cookies = null,
    array $files = null
): Request {
    $files = Functions::convertFiles($files ?: $_FILES);
    $server = $server ?: $_SERVER;
    $uri =
        isset($server['HTTPS']) && $server['HTTPS'] === 'on'
            ? 'https://'
            : 'http://';
    if (isset($server['HTTP_HOST'])) {
        $uri .= $server['HTTP_HOST'];
    } else {
        $uri .=
            $server['SERVER_NAME'] .
            (isset($server['SERVER_PORT']) &&
            $server['SERVER_PORT'] !== '80' &&
            $server['SERVER_PORT'] !== '443'
                ? ':' . $server['SERVER_PORT']
                : '');
    }
    $uri .= $server['REQUEST_URI'];
    $protocol = '1.1';
    if (isset($server['SERVER_PROTOCOL'])) {
        preg_match(
            '|^(HTTP/)?(?P<version>[1-9]\d*(?:\.\d)?)$|',
            $server['SERVER_PROTOCOL'],
            $matches
        );
        $protocol = $matches['version'];
    }
    return new static(
        $server,
        $files,
        $uri,
        $server['REQUEST_METHOD'],
        'php://input',
        Functions::parseHeaders($server),
        $cookies ?: $_COOKIE,
        $query ?: $_GET,
        $body ?: $_POST,
        $protocol
    );
}
```

首先是使用 `Functions::convertFiles` 方法将 `$_FILES` 关联数组转化到 `UploadFile` 数组，转化的步骤就不说明了，就是将数组的结构封装到对象（之所以要这么做是为了遵循 PSR 标准）。

```php
<?php
public static function convertFiles(array $files): array
{
    $result = [];
    foreach ($files as $key => $value) {
        if ($value instanceof UploadedFileInterface) {
            $result[$key] = $value;
            continue;
        }
        if (
            is_array($value) &&
            isset($value['tmp_name']) &&
            is_array($value['tmp_name'])
        ) {
            $result[$key] = self::resolveStructure($value);
            continue;
        }
        if (is_array($value) && isset($value['tmp_name'])) {
            $result[$key] = new UploadFile(
                $value['tmp_name'],
                $value['size'],
                $value['error'],
                $value['name'],
                $value['type']
            );
            continue;
        }
        if (is_array($value)) {
            $result[$key] = self::convertFiles($value);
            continue;
        }
    }
    return $result;
}
```

然后是拼接 URL，由于 PHP 已经对 URL 进行切割，所以我们还需要拼接回去，以便后续的代码使用。以及 Protocol 的提取。

由于 PHP 将 `Request header` 存入了 `$_SERVER` 为了方便使用，我们需要把 `$_SERVER` 中带有 `HTTP_` 前缀的字段都提取出来，这些就是 `Request header`，同时由于 `header` 是不区分大小写的，我们直接把 `header` 的名称转成小写即可。

```php
<?php
public static function parseHeaders(array $server): array
{
    $headers = [];
    foreach ($server as $key => $value) {
        if (!is_string($key)) {
            continue;
        }
        if ($value === '') {
            continue;
        }
        if (strpos($key, 'HTTP_') === 0) {
            $name = str_replace('_', '-', strtolower(substr($key, 5)));
            $headers[$name] = $value;
            continue;
        }
    }
    return $headers;
}
```

### new Request

有了上面的一些基础的信息，就可以正式的创建 `Request` 对象的：

```php
<?php
public function __construct(
    array $server = [],
    array $files = [],
    $uri = '',
    string $method = 'GET',
    $body = 'php://input',
    array $headers = [],
    array $cookies = [],
    array $query = [],
    $parsed_body = null,
    string $protocol = '1.1'
) {
    $this->validateFiles($files);
    if ($body === 'php://input') {
        $body = new Stream($body);
    }
    $this->setMethod($method);
    if ($uri instanceof UriInterface) {
        $this->uri = $uri;
    } else {
        $this->uri = new Uri($uri);
    }
    if ($body instanceof StreamInterface) {
        $this->stream = $body;
    } else {
        $this->stream = new Stream($body, 'wb+');
    }
    $this->setHeaders($headers);
    $this->server = $server;
    $this->files = $files;
    $this->cookies = $cookies;
    $this->query = $query;
    $this->protocol = $protocol;

    $content_type = $this->header('Content-Type');
    if (
        $content_type !== null &&
        stripos($content_type, 'application/json') !== false
    ) {
        $this->parsed_body = array_merge(
            $parsed_body,
            json_decode($this->stream->getContents(), true)
        );
    } else {
        $this->parsed_body = $parsed_body;
    }

    if (!$this->hasHeader('Host') && $this->uri->getHost()) {
        $host = $this->uri->getHost();
        $host .= $this->uri->getPort() ? ':' . $this->uri->getPort() : '';
        $this->headerAlias['host'] = 'Host';
        $this->headers['Host'] = [$host];
    }
}
```

首先需要对 `files` 进行验证，判断 `files` 是否实现了 `UploadedFileInterface`。

接着就需要对 `Request body` 进行封装了，`Stream` 是 `StreamInterface` 的实现类，提供了对 `body` 数据流的一些操作方法。

除了 `file` 和 `body`，我们还需要把 `url` 封装成 `Uri` 对象，该对象实现了 `UriInterface`，提供了对 `url` 的一些操作方法。

由于请求的方式可能是通过 JSON 的格式传输的，此时 `$_POST` 就无法获取到这些通过 JSON 传输的数据，所以，我们还需要解析 JSON。

在 PSR 标准中有说明，当请求没有 `Host` 头的时候，需要手动设置，保证 `Request` 对象中存在 `Host` 头。

## 结语

到这里初始化 Request 的部分就完成了。由于博主忙着重写 XK-Editor，所以更新 文章的速度可能会慢一点 2333。
