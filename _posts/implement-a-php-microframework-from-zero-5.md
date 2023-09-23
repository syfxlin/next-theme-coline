---
title: 从零实现一个 PHP 微框架 - 服务提供者
slug: implement-a-php-microframework-from-zero-5
status: publish
published_time: 2020-07-10T00:00:00.000Z
modified_time: 2021-07-28T07:00:36.784Z
layout: post
categories:
  - 折腾记录
tags:
  - XK-PHP
  - PHP
  - 从零实现
---

## 前言

考试在两周前就结束了，因为一直在填坑 [XK-Java](https://github.com/syfxlin/xkjava "https://github.com/syfxlin/xkjava")，所以一直没更新 PHP 微框架系列文章 2333，最近 XK-Java 也填的差不多了，后续打算把 XK-PHP 也适配到 Swoole，还有 XK-Blog 的坑还没填 ?。

## 什么是服务提供者（Provider）？

如果你写过 Laravel，那么你一定对 Provider 不陌生，服务提供者实现了将服务绑定到服务容器（IoC Container），并按需启动的功能。

在 Laravel 中，服务提供者是在 `config/app.php` 的配置文件中配置的：

```php
<?php
return [
    'providers' => [
        /*
         * Laravel Framework Service Providers...
         */
        Illuminate\Auth\AuthServiceProvider::class,
        Illuminate\Broadcasting\BroadcastServiceProvider::class,
        Illuminate\Bus\BusServiceProvider::class,
        Illuminate\Cache\CacheServiceProvider::class,
        Illuminate\Foundation\Providers\ConsoleSupportServiceProvider::class,
        Illuminate\Cookie\CookieServiceProvider::class,
        Illuminate\Database\DatabaseServiceProvider::class,
        Illuminate\Encryption\EncryptionServiceProvider::class,
        Illuminate\Filesystem\FilesystemServiceProvider::class,
        Illuminate\Foundation\Providers\FoundationServiceProvider::class,
        Illuminate\Hashing\HashServiceProvider::class,
        Illuminate\Mail\MailServiceProvider::class,
        Illuminate\Notifications\NotificationServiceProvider::class,
        Illuminate\Pagination\PaginationServiceProvider::class,
        Illuminate\Pipeline\PipelineServiceProvider::class,
        Illuminate\Queue\QueueServiceProvider::class,
        Illuminate\Redis\RedisServiceProvider::class,
        Illuminate\Auth\Passwords\PasswordResetServiceProvider::class,
        Illuminate\Session\SessionServiceProvider::class,
        Illuminate\Translation\TranslationServiceProvider::class,
        Illuminate\Validation\ValidationServiceProvider::class,
        Illuminate\View\ViewServiceProvider::class,

        /*
         * Package Service Providers...
         */

        /*
         * Application Service Providers...
         */
        App\Providers\AppServiceProvider::class,
        App\Providers\AuthServiceProvider::class,
        // App\Providers\BroadcastServiceProvider::class,
        App\Providers\EventServiceProvider::class,
        App\Providers\RouteServiceProvider::class
    ]
];
```

这些服务提供者会在框架启动后将服务注册到服务容器上，如果你学过 Spring，那么就很好理解了，这些服务提供者就是用编码的方式来注册 `Bean`、`Component` 等等，因为 PHP8 才开始支持注解，所以目前跑在 PHP7 的 Laravel 无法像 Spring 一样很方便的绑定服务实例。

光说肯定没法很好的理解，那么我们就来看一个简单的服务提供者吧：

```php
<?php

namespace Illuminate\Cookie;

use Illuminate\Support\ServiceProvider;

class CookieServiceProvider extends ServiceProvider
{
    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('cookie', function ($app) {
            $config = $app->make('config')->get('session');

            return (new CookieJar)->setDefaultPathAndDomain(
                $config['path'], $config['domain'], $config['secure'], $config['same_site'] ?? null
            );
        });
    }
}
```

这是 Laravel 用来注册 `CookieJar` 实例的服务提供者，可以看到在 `register` 方法中使用了 `singleton` 方法将一个的回调注册到了服务容器中，这样，当我们使用 `$app->make('cookie')` 的时候就可以取得 `CookieJar` 实例了。

当然服务提供者不止可以注册服务，还能在服务注册后启动实例，只要重写 `boot` 方法即可。

## 定义 Provider

了解了服务提供者，那么就可以开始编码了。

首先，我们需要定义 `Provider` 的接口和抽象类来规范 `Provider`，如下：

```php
<?php

namespace App\Contracts;

interface Provider
{
    // 之所以只定义 register 方法是因为并不是每一个服务提供者都需要预加载（boot），当然你也可以在接口定义 boot 方法，然后在抽象类中提供一个无影响的实现
    public function register(): void;
}
```

```php
<?php

namespace App\Providers;

use App\Application;

abstract class Provider implements \App\Contracts\Provider
{
    /**
     * @var Application
     */
    protected $app;

    /**
     * @var bool
     */
    public $booted = false;

    public function __construct(Application $app)
    {
        $this->app = $app;
    }
}
```

可以看到 `Provider` 和 `Bootstrap` 其实差不多，所以这里就不对抽象类做说明了，具体请看 [Bootstrap 篇](https://blog.ixk.me/implement-a-php-microframework-from-zero-4.html)。

## 编写 Provider

由于 `Provider` 数量众多，所以这里就不全部写了，只列举几个比较典型的。

### CookieProvider

`CookieProvider` 是一个简单纯注册服务的 `Provider`：

```php
<?php

namespace App\Providers;

use App\Http\CookieManager;

class CookieProvider extends Provider
{
    public function register(): void
    {
        // 将 CookieManager 注册到服务容器
        $this->app->singleton(CookieManager::class, null, 'cookie');
    }
}
```

### RouteProvider

`RouteProvider` 在注册后还会提供预加载，即 `boot`：

```php
<?php

namespace App\Providers;

use App\Kernel\RouteManager;

class RouteProvider extends Provider
{
    public function register(): void
    {
        $this->app->singleton(RouteManager::class, null, 'route');
    }

    // 在所有服务容器注册完毕后，经 BootProvider 这个 Bootstrap 调用该方法来预加载服务
    public function boot(): void
    {
        // 预加载就是在框架启动后立即实例化服务的功能
        $this->app->make(RouteManager::class);
    }
}
```

### AspectProvider

除了简单 `Provider`，还有一些比较复杂的 `Provider`，如 `AspectProvider`：

```php
<?php

namespace App\Providers;

use App\Kernel\AspectManager;
use function array_keys;
use function config;

class AspectProvider extends Provider
{
    /**
     * @var string[]
     */
    protected $aspects;

    public function register(): void
    {
        $this->app->singleton(
            AspectManager::class,
            function () {
                return new AspectManager($this->app);
            },
            'aspect.manager'
        );
        $this->aspects = config('aspect');
        foreach (array_keys($this->aspects) as $aspect) {
            $this->app->singleton($aspect, null);
        }
    }

    public function boot(): void
    {
        /* @var AspectManager $manager */
        $manager = $this->app->make(AspectManager::class);
        foreach ($this->aspects as $aspect => $points) {
            $manager->putPoint($points, $this->app->make($aspect));
        }
    }
}
```

在 `AspectProvider` 中不止注册了 `AspectManager`，还会读取配置文件将切面也加载进服务容器，同时在启动时把切面依次放入 `AspectManager`。

## 加载 Provider

有了 `Provider`，那么 `Provider` 是如何被创建和执行的呢？

在 `Bootstrap` 有两个 `Provider` 相关的 `Bootstrap`，分别是 `RegisterProviders` 和 `BootProviders`，上一篇文章只是简单介绍了这两个 `Bootstrap` 的功能，这里就详细的讲解一下。

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

然后我们看看 `ProviderManager`：

```php
<?php

namespace App\Kernel;

use App\Application;
use App\Providers\Provider;
use function array_map;
use function array_walk;
use function is_string;
use function method_exists;

class ProviderManager
{
    /**
     * @var Application
     */
    protected $app;

    /**
     * @var Provider[]
     */
    protected $providers;

    public function __construct(Application $app)
    {
        $this->app = $app;
    }

    /**
     * @param string|Provider $provider
     * @return Provider|null
     */
    public function getProvider($provider): ?Provider
    {
        if (is_string($provider)) {
            return $this->providers[$provider] ?? null;
        }
        return $provider;
    }

    public function setProvider($name, $provider): void
    {
        $this->providers[$name] = $provider;
    }

    public function register($provider, $force = false): Provider
    {
        if (!$force && ($reg = $this->getProvider($provider)) !== null) {
            return $reg;
        }
        if (is_string($provider)) {
            $name = $provider;
            $provider = new $provider($this->app);
            $this->setProvider($name, $provider);
        }
        if (method_exists($provider, 'register')) {
            $provider->register();
        }
        return $provider;
    }

    public function registers(array $providers): array
    {
        return array_map(function ($provider) {
            return $this->register($provider);
        }, $providers);
    }

    public function boot(): void
    {
        array_walk($this->providers, function (Provider $provider) {
            if (!$provider->booted && method_exists($provider, 'boot')) {
                $this->app->call('boot', [], $provider);
                $provider->booted = true;
            }
        });
    }
}
```

其实看起来复杂，不过 `ProviderManager` 做的事情也很简单。

首先利用 `Class` 创建对应 `Provider` 实例，然后将 `Provider` 添加到 `ProviderManager` 的 `Provider` 数组中，最后判断有没有 `register` 方法，如果有则执行该方法。

有了注册，那么还需要一个启动：

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

在 `BootProviders` 中 `boot` 方法会从服务容器中取得 `ProviderManager`，然后调用其 `boot` 方法，依次执行 `Provider` 的 `boot` 方法。

## 结语

到这里 Provider 的部分就说完了。现在也放假了，PHP 微框架的文章会逐步更新。不过最近还是比较忙的，更新速度会慢一点。?
