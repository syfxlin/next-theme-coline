---
title: 从零实现一个 PHP 微框架 - Bootstrap 启动加载
slug: implement-a-php-microframework-from-zero-4
status: publish
published_time: 2020-06-18T00:00:00.000Z
modified_time: 2021-07-28T07:04:12.680Z
layout: post
categories:
  - 折腾记录
tags:
  - PHP
  - XK-PHP
  - 从零实现
---

## 前言

抽了个空更新一下，给博客除除草。

Laravel 框架中在启动的时候，会依次调用 `Illuminate\Foundation\Http\Kernel::$bootstrappers` 中的启动类，这些启动类会完成对 `.env` 文件的加载，配置文件的加载，配置错误处理器，注册 `Provider`，并启动 `Provider`。XK-PHP 也参考该流程制作了对应的 Bootstrap，但是 XK-PHP 并没有用 Kernel 来加载，而是使用 `Application` 这个类来作为核心，调控框架。

## 定义 Bootstrap

首先我们需要创建一个 `Bootstrap` 接口和抽象类来管理 `Bootstrap`，`Bootstrap` 接口和抽象类如下：

```php
<?php

namespace App\Contracts;

interface Bootstrap
{
    public function boot(): void;
}
```

```php
<?php

namespace App\Bootstrap;

use App\Application;

abstract class Bootstrap implements \App\Contracts\Bootstrap
{
    /**
     * @var Application
     */
    protected $app;

    public function __construct(Application $app)
    {
        $this->app = $app;
    }
}
```

由于我们在 `Bootstrap` 中可能需要用到 `Application` 中的实例或方法，或者需要将将类或实例绑定到 `Application` 中，我们可以通过构造器传入一个 `Application` 实例，当 `Bootstrap` 具体的实现类需要使用的时候就可以直接使用 `$this->app` 来取得 `Application`，而不再需要使用 `Application` 的静态方法来调用。

## 编写 Bootstrap

首先我们先看下需要哪些 `Bootstrap`，同时需要知道那些需要在 `Bootstrap` 中加载。

`Bootstrap` 的作用是在应用启动时对一些配置文件，环境变量，门面，异常处理这些进行读取注册，主要的工作是在 `Provider` 未开始执行的时候提供 `Application` 运作的基础服务，而具体的服务，如切面，路由，数据库等不是基础服务，应在 `Provider` 中进行加载，关于 `Provider` 我会在下一篇中介绍。

我们直接看看有那些 `Bootstrap` 吧，`Bootstrap` 列表是在 `Application` 中定义的，如下：

```php
<?php
class Application extends Container
{
    /**
     * 存储 App 中所有的单例 instance
     *
     * @var Application
     */
    public static $app;

    /**
     * @var string[]
     */
    protected $bootstraps = [
        // 加载 env 文件
        LoadEnvironmentVariables::class,
        // 加载配置
        LoadConfiguration::class,
        // 注册门面
        RegisterFacades::class,
        // 注册异常处理
        HandleExceptions::class,
        // 注册服务提供者管理器
        RegisterProviders::class,
        // 启动服务
        BootProviders::class,
    ];
}
```

### LoadEnvironmentVariables

该 `Bootstrap` 主要的工作是加载环境变量和 .env 文件，使用的是 `vlucas/phpdotenv` 这个库，所以加载的部分就很简单了，直接调用其方法即可。

```php
<?php

namespace App\Bootstrap;

use Dotenv\Dotenv;

class LoadEnvironmentVariables extends Bootstrap
{
    public function boot(): void
    {
        // .env 文件所在的文件夹
        $dotenv = Dotenv::createImmutable(__DIR__ . '/../../');
        $dotenv->load();
    }
}
```

### LoadConfiguration

然后就是加载配置文件了，之所以不直接使用 env 来作为配置，主要的是 env 并不需要将所有的配置都写全，应用要调用的时候就需要设置默认值，当该配置文件多了，需要改默认值的时候，就容易遗漏，非常不好管理。所以我们需要另外的配置文件来集中的管理。`LoadConfiguration` 的内容很简单，就是绑定 `Config` 类实例到容器中，其中配置文件的读取是在 `Config` 类中完成的。

```php
<?php

namespace App\Bootstrap;

use App\Utils\Config;

class LoadConfiguration extends Bootstrap
{
    public function boot(): void
    {
        $this->app->instance(Config::class, new Config(), 'config');
    }
}
```

```php
<?php

namespace App\Utils;

// ...

class Config
{
    /**
     * 配置项，动态读取
     *
     * @var array
     */
    private static $config;

    public function __construct()
    {
        // 匹配 config_path 下的所有 php 文件，并解析存入 $config 静态属性
        foreach (glob(config_path() . '/*.php') as $path) {
            self::$config[pathinfo($path, PATHINFO_FILENAME)] = require $path;
        }
    }
}
```

在 Laravel 中，`LoadConfiguration` 还进行了许多的操作，比如，如果有 Config 缓存文件则直接读取缓存文件，当没有缓存文件的话，Laravel 才会扫描 Config 目录，在 Laravel 中，Config 是支持文件夹的，不过 XK-PHP 就没对文件夹进行处理。Laravel 在 `LoadConfiguration` 还会对一些值进行初始化，如设置时区 `date_default_timezone_set`，设置编码 `mb_internal_encoding`，然后检测是开发环境还是生产环境，并将该值设置到容器。

### RegisterFacades

在 Laravel 中，门面是一个很方便的东西，我们可以通过门面快速对方法进行调用，同时也不需要关系我们调用的方法来自哪个类，是静态方法还是实例方法。XK-PHP 也采用这一设计，不过 XK-PHP 也缩减掉了部分功能，比如同一个门面调用不同类的方法等等。

XK-PHP 中注册门面的过程也是很简单，就是将 `Application` 设置到门面抽象类中的静态属性，如下：

```php
<?php

namespace App\Bootstrap;

use App\Facades\Facade;

class RegisterFacades extends Bootstrap
{
    public function boot(): void
    {
        Facade::setApplication($this->app);
    }
}
```

具体的实现这里就先不说明了，后续讲门面的时候在说吧。

### HandleExceptions

接下来就是注册异常处理了，在说明具体的实现之前，我们需要先了解一下 PHP 异常处理相关的函数。

- **`error_reporting`**：设置报告的异常等级，`0` 表示不报告错误，`-1` 表示报告所有错误。
- **`set_error_handler`**：设置自定义的**错误**处理函数，当应用抛出**错误**没有使用 `try/catch` 捕获的时候，会调用该函数设置的处理函数对**错误**进行处理。
- **`set_exception_handler`**：设置自定义的**异常**处理函数。
- **`register_shutdown_function`**：设置一个在 PHP 脚本停止时调用的函数。

有了上面这些函数，我们就可以很方便的进行异常处理了：

```php
<?php

namespace App\Bootstrap;

// ...

class HandleExceptions extends Bootstrap
{
    /**
     * @var string
     */
    protected $env;

    public function boot(): void
    {
        $this->env = $this->app->environment();
        if ($this->env !== 'development') {
            // 不处于开发环境的时候则设置异常处理
            error_reporting(-1);
            set_error_handler([$this, 'handleError']);
            set_exception_handler([$this, 'handleException']);
            register_shutdown_function([$this, 'handleDown']);
            ini_set('display_errors', 'Off');
        }
    }

    public function handleError(
        $level,
        $message,
        $file = '',
        $line = 0,
        $context = []
    ): void {
        // 将 Error 级别的错误转化成 Exception，交给 handleException 处理
        if (error_reporting() & $level) {
            throw new ErrorException($message, 0, $level, $file, $line);
        }
    }

    public function handleException(Throwable $e): void
    {
        // 渲染 Response，并发送
        $this->renderResponse($e)->send();
    }

    protected function renderResponse(Throwable $e): Response
    {
        try {
            // 首先获取 Request
            $request = $this->app->make(Request::class);
        } catch (\Exception $ex) {
            // 如果获取 Request 异常了，那也没办法，直接设为 null
            $request = null;
        }
        // 如果不是集成自 XK-PHP 的可渲染异常，那么就包装一下异常
        if (!$e instanceof \App\Contracts\Exception) {
            $e = new Exception(Response::$phrases[500], 500, $e->getPrevious());
        }
        // 对异常进行渲染，当是浏览器请求的时候返回 HTML，若是异步请求，则返回 JSON
        return $e->render($request);
    }

    public function handleDown(): void
    {
        // 获取最后一个异常
        $error = error_get_last();
        if (
            $error !== null &&
            in_array(
                $error['type'],
                [E_COMPILE_ERROR, E_CORE_ERROR, E_ERROR, E_PARSE],
                true
            )
        ) {
            // 如果有异常，则处理异常
            $this->handleException(
                new ErrorException(
                    $error['message'],
                    $error['type'],
                    0,
                    $error['file'],
                    $error['line']
                )
            );
        }
    }
}
```

### RegisterProviders

注册 Providers，在一些基础服务加载后，就可以注册服务提供者了，XK-PHP 另外写了一个类来管理 `Provider`，所以 `Bootstrap` 的代码也挺简单的：

```php
<?php

namespace App\Bootstrap;

use App\Kernel\ProviderManager;
use function config;

class RegisterProviders extends Bootstrap
{
    public function boot(): void
    {
        $this->app->setProviderManager(new ProviderManager($this->app));
        $this->app->getProviderManager()->registers(config('app.providers'));
        $this->app->instance(
            ProviderManager::class,
            $this->app->getProviderManager(),
            'provider_manager'
        );
    }
}
```

关于 `ProviderManager` 的内容会在下一篇讲解，本篇就不做太多的说明了。

### BootProviders

最后就是启动 `Provider` 了：

```php
<?php

namespace App\Bootstrap;

class BootProviders extends Bootstrap
{
    public function boot(): void
    {
        $this->app->getProviderManager()->boot();
    }
}
```

## 结语

最近学院里安排了考试，同时又安排了 JavaWeb 体验实习的课程（说白了就是培训班的课程，真的浪费时间，会的都会了，不会的这期末开课也没人想听），所以最近没有什么时间来更新文章和项目了，等 6 月底考完后应该就会有比较宽松的时间，虽然说还有体验实习的课程和对应的课程设计，不过 XK-Java 也已经完成了，写项目会比纯 JavaWeb 写起来容易多了，所以应该还行。

![](images/e136b35d-29d6-4094-96c7-b47bc7af0816.jpg)
