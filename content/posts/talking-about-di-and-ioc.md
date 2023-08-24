---
title: 浅谈 DI 和 IoC
slug: talking-about-di-and-ioc
status: publish
published_time: 2020-04-09T00:00:00.000Z
modified_time: 2021-07-28T07:05:29.951Z
layout: post
categories:
  - 折腾记录
tags:
  - Spring
  - 浅谈
  - Laravel
---

## 前言

用过 Laravel 或者 Spring 的人一定都听过 **依赖注入(DI)** 和 **控制反转(IoC)** 这个概念，对于刚接触这两个个概念的人来说，这两个概念很难理解，正好最近折腾了下设计模式把这两个概念给补上了，于是便打算写一篇文章记录下。

## 控制反转是什么？

用单纯的语言肯定讲不清楚这个概念的，所以，我们先来看一段代码吧：

```php
<?php
interface Device
{
    public function playGame();
}

class Computer implements Device
{
    public function playGame()
    {
        echo "玩游戏\n";
    }
}

class Player
{
    private $name = "玩家";

    public function printName()
    {
        echo $this->name . "\n";
        return $this;
    }

    public function playGame()
    {
        (new Computer)->playGame();
        return $this;
    }
}

(new Player)->printName()->playGame();

// 玩家
// 玩游戏
```

首先我们先看一下上面的代码，玩家要玩游戏，但是玩家并没办法仅靠自己完成这个操作，需要借助一台电脑，此时电脑就称之为 **依赖**，而玩家操作电脑玩游戏的过程就称之为 **控制**。

不过随着科技的进步，手机游戏逐渐的取代了部分桌面游戏，该玩家也因为各种广告的熏陶逐渐想玩某款手机游戏了，不过玩家发现自己已经和电脑 **"绑定"** 在一起了，如果要更换设备就需要修改内部的代码。不过这样以后就不能再使用电脑，作为一个重度电脑依赖的玩家这怎么能接受。

那么有什么方法可以解决这个问题吗？有的，那就是把 **控制反转** 过来，将 **依赖**，也就是设备动态的赋予玩家，玩家不控制设备的创建和销毁，玩家只负责使用设备，如下代码：

```php
<?php
interface Device
{
    public function playGame();
}

class Computer implements Device
{
    public function playGame()
    {
        echo "玩游戏\n";
    }
}

class Player
{
    private $name = "玩家";
    private $device;

    public function __construct(Device $device)
    {
        $this->device = $device;
    }

    public function printName()
    {
        echo $this->name . "\n";
        return $this;
    }

    public function playGame()
    {
        $this->device->playGame();
        return $this;
    }
}

(new Player(new Computer))->printName()->playGame();

// 玩家
// 玩游戏
```

## 依赖注入是什么？

从上面的代码可以看到设备是动态传入的，当需要更换设备的时候就只需要更换传入的参数即可，而不需要修改玩家类，而将参数传入到类的过程就称之为 **依赖注入**。

常见的依赖注入的方式有三种：

1. _构造器注入_
2. _接口注入_
3. _设置属性注入_

上方代码使用的就是 **构造器注入** 的方式。

依赖注入可以解决依赖需要切换的问题，解决各部件之间的强耦合问题。但是依赖注入也有个麻烦，如果依赖项太多了怎么办？每次使用的时候都需要创建一堆的依赖，并设置这些依赖：

```php
<?php
$c1 = new Class1;
$c2 = new Class2;
$c3 = new Class3;
$c4 = new Class4;
$c5 = new Class5;

$c6 = new Class6($c1, $c2, $c3, $c4, $c5);
```

可以看到这样的代码并不优雅，还会加大对象创建的难度和复杂度，这种情况可以使用工厂模式来解决：

```php
<?php
class Factory {
    public static function make()
    {
        //... new class 1-5
        return new Class6($c1, $c2, $c3, $c4, $c5);
    }
}

$c6 = Factory::make();
```

工厂模式解决了创建对象复杂的问题，但是你会发现，这样就又回到了原点，对象的依赖就被工厂绑定了，当需要使用到其他依赖的时候工厂就无用武之地了。

## IoC 容器

那么还有什么的其他的方法能解决依赖注入的问题吗？答案是使用 **IoC 容器**。那么什么是 IoC 容器呢？我们可以把 **IoC 容器** 看成一个 **仓库**，里面存放着 **依赖项**，在运行的时候 **注册绑定** 一些需要用到的依赖，当我们要使用的某个对象的时候，直接 **提取制造** 一个出来即可，容器内部会自动创建并注入依赖。

### 反射

反射是 IoC 容器实现的关键，通过反射 IoC 容器就能知道类或者方法用到了哪些依赖，知道了需要使用的依赖后就可以到依赖列表中进行查找查找完成后就可以将依赖赋值给对应的类和方法。

举个例子说明下吧：

```php
<?php
class Cat
{
    public function getName(): string
    {
        return "猫";
    }
}

class PetShop
{
    /**
     * 动物依赖
     *
     * @var Cat
     */
    private $cat;

    /**
     * 构造器注入
     *
     * @param   Cat  $cat  动物依赖
     *
     * @return  PetShop
     */
    public function __construct(Cat $cat)
    {
        $this->cat = $cat;
    }

    public function printName()
    {
        echo $this->cat->getName() . "\n";
    }
}

// 获取反射类
$reflector = new ReflectionClass(PetShop::class);
// 获取构造器
$constructor = $reflector->getConstructor();
// 获取构造器的参数，也就是依赖
$dependencies = $constructor->getParameters();
// 打印所有的依赖
var_dump($dependencies);
// 获取依赖的类
$class = $dependencies[0]->getClass();
var_dump($class);
// 创建依赖对象
$cat = new $class->name;
var_dump($cat);
// 将依赖注入，并实例化
$pet_shop = $reflector->newInstanceArgs([$cat]);
$pet_shop->printName();
// F:\Code\code\design-pattern\Test.php:44:
// array(1) {
//   [0] =>
//   class ReflectionParameter#3 (1) {
//     public $name =>
//     string(3) "cat"
//   }
// }
// F:\Code\code\design-pattern\Test.php:47:
// class ReflectionClass#4 (1) {
//   public $name =>
//   string(3) "Cat"
// }
// F:\Code\code\design-pattern\Test.php:50:
// class Cat#5 (0) {
// }
// 猫
```

可以看到代码中通过 PetShop 的反射类获取到了构造器的参数列表，并且通过反射参数获取到参数的类名，此时就可以通过类名创建对应的依赖，最后再使用反射类实例化出对象。

### 容器代码

首先先贴代码：[https://github.com/syfxlin/code/tree/master/design-pattern/IoC](https://github.com/syfxlin/code/tree/master/design-pattern/IoC)

这个 IoC 容器是给 XK-PHP 设计的，参考了 Laravel 的容器和网上一些代码改造而来，实现了大部分 Laravel 容器的功能，所以显得很复杂 2333。这里就大致讲一下流程。

容器创建后就需要调用 [bind](https://github.com/syfxlin/code/blob/e8f3c06fbb164195d0e98718a9298e043810cb2e/design-pattern/IoC/Container.php#L56-L91) 方法绑定依赖，bind 方法再通过调用 [setBind](https://github.com/syfxlin/code/blob/e8f3c06fbb164195d0e98718a9298e043810cb2e/design-pattern/IoC/Container.php#L94-L116) 方法完成对依赖的绑定，在 setBind 中会判断传入的 concrete 是否是闭包，如果不是闭包则 [创建](https://github.com/syfxlin/code/blob/e8f3c06fbb164195d0e98718a9298e043810cb2e/design-pattern/IoC/Container.php#L102-L106) 一个闭包，之所以使用闭包而不是直接 new 一个依赖是为了达到懒加载的效果，如果直接 new 一个依赖其实就变成了单例模式了，单例模式的实例是不会变化的这样也就没必要使用容器了。

完成依赖的绑定后，当我们需要使用到某个对象的时候，就需要调用 [make](https://github.com/syfxlin/code/blob/e8f3c06fbb164195d0e98718a9298e043810cb2e/design-pattern/IoC/Container.php#L154-L171) 方法，make 方法会 [运行](https://github.com/syfxlin/code/blob/e8f3c06fbb164195d0e98718a9298e043810cb2e/design-pattern/IoC/Container.php#L165) 对应对象的闭包，闭包的返回值就是当前对象的实例，这个闭包可以自行设置，也可以使用 默认的闭包，在默认的闭包中会调用 [build](https://github.com/syfxlin/code/blob/e8f3c06fbb164195d0e98718a9298e043810cb2e/design-pattern/IoC/Container.php#L222-L250) 方法来构建实例，构建的流程其实就是上面反射一节中的流程，在 build 方法中会调用 [injectingDependencies](https://github.com/syfxlin/code/blob/e8f3c06fbb164195d0e98718a9298e043810cb2e/design-pattern/IoC/Container.php#L260-L280) 方法来处理要注入的依赖参数。若对应的依赖通过是通过外部传入的则直接进行 [设置](https://github.com/syfxlin/code/blob/e8f3c06fbb164195d0e98718a9298e043810cb2e/design-pattern/IoC/Container.php#L266-L269)。若需要的依赖是一个类，则调用 [resolveClass](https://github.com/syfxlin/code/blob/e8f3c06fbb164195d0e98718a9298e043810cb2e/design-pattern/IoC/Container.php#L317-L327) 方法来处理类依赖，由于依赖可能还需要使用到其他依赖，所以需要调用 make 方法来进行递归处理依赖。如果需要的依赖不是一个类，则通过 [resolvePrimitive](https://github.com/syfxlin/code/blob/e8f3c06fbb164195d0e98718a9298e043810cb2e/design-pattern/IoC/Container.php#L289-L308) 方法来处理依赖，查找的方式是使用变量名的方式，如果容器中有绑定对应变量名的依赖则 [注入](https://github.com/syfxlin/code/blob/e8f3c06fbb164195d0e98718a9298e043810cb2e/design-pattern/IoC/Container.php#L291-L300) 对应的绑定，如果没找到绑定的变量，那么就看看有没有 [默认值](https://github.com/syfxlin/code/blob/e8f3c06fbb164195d0e98718a9298e043810cb2e/design-pattern/IoC/Container.php#L304-L306)，如果默认值也没有，那么就抛出异常。如果一切正常那么最终就会 [实例化](https://github.com/syfxlin/code/blob/e8f3c06fbb164195d0e98718a9298e043810cb2e/design-pattern/IoC/Container.php#L249) 对应的对象。

当然，有依赖注入类的，自然也有注入函数或方法的，具体这里就不讲了，过程和注入类类似，相关的代码见 Github

## 结语

总算写完了，又是一篇水文呢 o(^▽^)o，不知道大家有没有看懂呢？文中可能有错误或不足之处，如果您发现了问题欢迎反馈。\[\]~(￣ ▽ ￣)~\*
