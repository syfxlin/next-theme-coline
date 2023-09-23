---
title: 浅谈并发：ThreadLocal
slug: talking-about-concurrency-threadlocal
status: publish
published_time: 2021-02-12T00:00:00.000Z
modified_time: 2021-07-28T06:32:43.840Z
layout: post
categories:
  - 折腾记录
tags:
  - Java
  - 浅谈
  - 并发
---

## 前言

日常水文章.jpg

## ThreadLocal

**ThreadLocal** 是关于创建线程局部变量的类，类似于沙箱，当前线程存储的变量只能被当前线程访问，不同线程间的变量是隔离开的。

ThreadLocal 其实只是一个委托类，实际存储的数据是存在线程中的 `ThreadLocalMap` 里，由于线程是互相隔离的，所以 `Thread` 里的数据也就原生隔离了。所以获取 ThreadLocal 的值其实经过了以下几个步骤：

1. 首先获取当前线程。
2. 利用当前线程作为句柄获取一个来自该实例中的 `ThreadLocalMap` 的对象。
3. 如果上述 `ThreadLocalMap` 对象不为空，则从 `ThreadLocalMap` 中取得以当前 `ThreadLocal` 对象为 key 的值。
4. 如果`ThreadLocalMap` 对象为空，或者取得的值为 `null`，则通过 `initialValue` 方法取得初始值，将初始值设置到 `ThreadLocalMap` 或者创建这个 `ThreadLocalMap` 对象并设置值。

源码如下：

```java
public T get() {
    Thread t = Thread.currentThread();
    ThreadLocalMap map = getMap(t);
    if (map != null) {
        ThreadLocalMap.Entry e = map.getEntry(this);
        if (e != null) {
            @SuppressWarnings("unchecked")
            T result = (T)e.value;
            return result;
        }
    }
    return setInitialValue();
}
```

`getMap` 方法其实就是获取了 `t.threadLocals` 这个属性，所以 `ThreadLocal` 里的值被对应的线程持有，存放于堆中。（当然这并不是绝对的，因为还有栈上分配、标量替换等优化）。

## InheritableThreadLocal

除了 **ThreadLocal** 外，Java 中还提供了一个 **InheritableThreadLocal**。

**InheritableThreadLocal** 是 ThreadLocal 的扩展版本，当父线程创建子线程的时候，父线程的 `ThreadLocalMap` 就会被复制到子线程中。这样就能做到线程间传递变量。

不过需要注意的是，发生传递的情况只有在子线程是父线程创建的，然而我们一般不会直接创建线程，而是通过线程池的方式来使用，这也导致了无法形成层级关系，此时父子线程间的上下文传递就没有用了。当然这也有解决方案，比较流行的如阿里的 [TTL](https://github.com/alibaba/transmittable-thread-local)。

## ThreadLocalMap

**ThreadLocalMap** 虽有 Map 的后缀但是它并不继承自 `Map` 接口，所以内部的方法并没有同 `Map` 一样有非常多的方法。同时实现也不同于 `HashMap`，内部并没有使用 **数组+链表（红黑树）**的方式进行存储，而是只简单的 **数组** 来存储的。对于 hash 冲突的解决方式是采用**开放寻址法**。

**ThreadLocalMap** 的 key 是弱引用，value 是强引用的存储结构。

## 内存泄漏

### 原因

首先说明一点，**ThreadLocal** 本身设计并不存在内存泄漏的问题，之所以会发生内存泄漏，实际上是因为错误的使用导致的。

由于 **ThreadLocalMap** 中的 key 是弱引用的，当 key 被 GC 清理后，**ThreadLocalMap** 中就只剩下了 `value`，而这个 `value` 是强引用的，会一直在线程中存在，此时即使 **ThreadLocalMap** 的使用者不再引用这些对象，这些对象也无法被垃圾回收，因为还有一条引用链引用这这个 `value`：

![](images/f5c22dd3-3df1-468a-bdc3-54f1c99dd2b9.jpg)

如果没有调用 `remove` 方法清除不再需要使用的值，那么这个值就会一直存在直到 Thread 对象被销毁。然而我们一般情况下都是使用线程池，所以线程的生命周期非常长，不 `remove` 最终可能会导致 OOM。

### 解决方案

对于过期的值清除有以下三种方式：

1. **显示清除：**这是推荐的方式，通过调用 `remove` 方法就可以将下面那条引用断开，这样 `value` 就不再拥有强引用了，GC 也就能回收这个对象了。
2. **隐式清除：**隐式清除分为两个步骤：
   - **清除 key：**由于 Key 是弱引用的，其指向的 `ThreadLocal` 实例可被 GC 回收，回收后从 `k-v` 变成 `null-v`。
   - **清除 value：**当我们调用 `get`、`set` 等方法的时候，会自动寻找 key 为 `null` 的元素并删除（`expungeStaleEntry`）。
3. **自动清除：**由于 `ThreadLocalMap` 是随着 `Thread` 存在的，当 `Thread` 被回收的时候，`ThreadLocalMap` 就会被一起回收。这在使用线程池的情况下基本无法使用。

为了避免发生保持在 `null-v` 这种内存泄漏的情况，我们可以使用**显示清除**这种较为简单也是最推荐的方式。

或者也可以将 `ThreadLocal` 设置为 `static` 这种情况，这样就保证了 key 不会被 GC 自动回收，当我们再次使用的时候就会覆盖之前的值，之前的值也就不存在强引用了。但是这种方式同样也要注意一点，由于我们一般会使用线程池来执行任务，那么 `ThreadLocalMap` 也会被保留下来，其中的值不会被清除，当我们再次使用 `ThreadLocal` 的时候，如果未先 `remove` 掉旧值那么就有可能造成值残留的问题。

## 结语

总算写完文章了，差不多写了快 2 小时吧，虽然不是什么复杂的知识，但是耗时确实挺多的。

另外吐槽下这个坑爹的 WordPress，越更新越难用，现在这个 Gutenberg 编辑器越来越卡，打算换平台了，但是又不舍得这个主题（换平台移植主题太花时间了，今年估计是没法）。
