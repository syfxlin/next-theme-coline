---
title: 浅谈泛型擦除
slug: talking-about-type-erasure
status: publish
published_time: 2021-07-01T00:00:00.000Z
modified_time: 2021-07-29T14:39:15.799Z
layout: post
categories:
  - 折腾记录
tags:
  - Java
  - 泛型
---

## 前言

泛型是 Java 5 引入的一个新特性，现在的高级语言基本也都支持泛型了。泛型本质上是将类型作为参数，以提供类型检查和避免不必要的类型转换。具体关于类型的本篇文章就不再说明了，具体可以自行查找。

## 什么是泛型擦除？

在 Java 中的泛型，常常被称为伪泛型。之所以这么说是因为 Java 的泛型在经过编译时会**将实际的类型信息擦除掉**。在字节码中就不存在泛型的信息了，JVM 运行的时候自然而然的就没有泛型信息了。

真泛型与伪泛型：

- 真泛型：即泛型在运行期间是真实存在的，运行时可以取得泛型对应的实际类型，如 `this.getComponent<ExampleComponent>()` 方法可以取得 `ExampleComponent` 类型的实例。
- 伪泛型：即泛型在运行期间不可见，仅在编译时进行类型检查，如 `this.getComponent<ExampleComponent>(ExampleComponent.class)` 方法，必须传入 `ExampleComponent.class` 才能取得对应类型的实例，因为泛型定义 `<ExampleComponent>` 在运行期间无法取得，只能通过另外传入类型的方式来实现相同的功能。

## 为什么 Java 要进行泛型擦除？

在说明原因的时候我们需要了解真泛型和伪泛型的实现机制。

### 实现思路

编程语言引入**真泛型**的方式一般是使用**代码膨胀**的方式，举个例子来说当我们有一个 `Component<T>` 的类，那么代码经过编译后会生成如 `Component@T` 的类，其中多出来的 `@T` 分别为标记和占位符。当我们使用的时候如 `new Component<String>()`，此时编译器则会将原始类中的 `T` 占位符更改为 `String` 类，同时生成一个新的类，如 `Component@String` 类，此时实际类型就被保留下来了。当我们使用的时候就可以同普通类一样使用，如：

```java
if (obj instanceof T) {}
new T();
new T[1];
```

而**伪泛型**的处理方式则很简单，还是举个例子来说吧，当 `Component<T>` 编译后会将其中的 `T` 占位符去除，变成 `Component` 类，当我们使用的时候如 `new Component<String>()` 那么经过编译后，会将 `String` 类型标注去除，变成 `Component` 相当于 `Component<Object>`。

### 使用真泛型带来的问题

Java 是在 Java 5 后才引入的泛型支持，为了支持真泛型需要修改 JVM 源代码，加入泛型支持，同时为了兼容 Java 5 以前的程序，不能改动以前的旧版本类，而是另外新增一套支持泛型的新版本类，如 `java.util.ArrayList` 和 `java.util.generic.ArrayList<T>`。

这样的实现看似很简单，只需要引入一套泛型，当需要使用泛型的时候就使用泛型包下的类，似乎还更灵活一点？但是我们忽略了一个问题，当项目中某个依赖库使用了泛型重新生成了字节码文件，此时这个项目为了兼容就必须也同时升级到 Java 5，否则会抛出 `UnsupportedClassVersionError` 错误。而 Java 5 之前的生态已经非常完善，此时如果为了引入泛型，就不得不让许多库都修改代码，显然这是不合理的。

## 为什么 Spring 还能进行泛型注入？

### 实现思路

我们知道 Spring 可以通过集合元素的泛型来注入对应的依赖，如下面的代码，在容器启动后，Spring 会将容器内对应类型的依赖注入到响应的变量中。

```java
class Demo1ApplicationTests {
    @Autowired
    List<ApplicationContext> contexts;

    @Autowired
    Map<String, ApplicationContext> contextMap;

    @Test
    void contextLoads() {
        log.info("ApplicationContext: {}", contexts);
        log.info("ApplicationContext: {}", contextMap);
    }
}
```

既然 Java 会进行泛型擦除，那么这两个字段在 JVM 中实际上是 `List<Object>` 和 `Map<Object, Object>`，理应是无法注入的，那么 Spring 又是通过何种手段取得这本不存在的信息呢？

实际上 Java 虽然将泛型信息擦除了，但是为了能够让虚拟机解析、反射等各种场景正确获取到参数类型，JCP 组织修改了虚拟机规范，引入了 `Signature`和`LocalVariableTypeTable`。这样即使泛型被擦除了，在一些特定的场景下还是能取得泛型信息。我们就以上面的代码为例，通过 jclasslib 查看字节码信息（偷懒不用 javap）：

![](images/b8ec3047-6910-42af-b837-18cadce51705.jpg)

可以看到特有信息里出现了 `ApplicationContext` 的身影，这就是保留下来的泛型信息。在 Java 中，以下场景都会提供签名：

- 具有通用或者具有参数化类型的超类或者超接口的类。
- 方法中的通用或者参数化类型的返回值或者入参，以及方法的 throw 子句中的类型变量。
- 任何类型、类型变量、或者参数化类型的字段、形式参数或者局部变量。

### 取得泛型信息

既然知道 Java 会将泛型信息保留到 `Signature`，那么我们就可以取得对应的泛型信息了，如下：

```java
class Demo1ApplicationTests {
    @Autowired
    List<ApplicationContext> contexts;

    @Test
    void contextLoads() throws NoSuchMethodException, NoSuchFieldException {
        // 具有泛型的超类
        log.info(
            "Type: {}",
            Arrays.toString(
                (
                    (ParameterizedType) TestClass.class.getGenericSuperclass()
                ).getActualTypeArguments()
            )
        );
        // 返回值
        final Method method =
            this.getClass().getDeclaredMethod("testMethod", List.class);
        log.info(
            "Type: {}",
            Arrays.toString(
                (
                    (ParameterizedType) method.getGenericReturnType()
                ).getActualTypeArguments()
            )
        );
        // 参数
        log.info(
            "Type: {}",
            Arrays
                .stream(method.getGenericParameterTypes())
                .map(type -> (ParameterizedType) type)
                .map(ParameterizedType::getActualTypeArguments)
                .collect(Collectors.toList())
        );
        // 字段
        log.info(
            "Type: {}",
            Arrays.toString(
                (
                    (ParameterizedType) this.getClass()
                        .getDeclaredField("contexts")
                        .getGenericType()
                ).getActualTypeArguments()
            )
        );
    }

    List<ApplicationContext> testMethod(List<ApplicationContext> contexts) {
        return contexts;
    }

    public static class TestClass extends ArrayList<ApplicationContext> {}
}

```

文中就只列举了几种常见的场景，不过需要注意有些泛型信息虽然有保留但是使用 Java 反射无法获取，如局部变量，Java 没有对应局部变量的反射机制，自然也无法取得对应的泛型信息，需要额外借助 ASM 等字节码工具类来进行读取。

## 擦除方式

在 Java 中，我们为了限制泛型的使用会使用一些修饰符来定义泛型的上下限，如以下几种定义：

```java
<?>           // 无限制通配符
<T>           // 无限制通配符
<? extends E> // extends 关键字声明了类型的上界，表示参数化的类型可能是所指定的类型，或者是此类型的子类
<? super E>   // super 关键字声明了类型的下界，表示参数化的类型可能是指定的类型，或者是此类型的父类
<T extends Staff & Passenger> // 合并限制
```

从上面的几种修饰方式我们可以看出，泛型擦除被分成了有限制泛型擦除和无限制泛型擦除两种。

### 无限制泛型擦除

无限制泛型擦除，当类或方法定义中的类型参数没有任何限制时，即形如 `<T>` 和 `<?>` 的类型参数都属于无限制泛型擦除。在进行无限制泛型擦除时，Java 编译器会将这些泛型信息都替换为 `Object`。

![](images/0423f7a1-c52c-4ddc-bd0e-0fbd584c675d.jpg)

如以下的测试代码，其编译后的签名为 `<<T:Ljava/lang/Object;>(TT;)V>`

```java
public static <T> void object(final T object) {} // <<T:Ljava/lang/Object;>(TT;)V>
```

### 有限制泛型擦除

有限制泛型擦除，当类或方法参数等类型参数存在限制（上下界）时，即形如 `<T extends Number>`，`<? extends Number>`，`<? super Number>` 的类型参数都属于有限制泛型擦除。在进行有限制泛型擦除的时候 Java 编译器会将这些泛型信息进行变更。其中 `extends` 修饰的会被替换成具体的类型，如 `<T extends Number>` 会替换为 `Number`。`super` 修饰的会被替换为 `Object`。

![](images/33c4344c-1896-4e69-8b41-fb7a85e2c76a.jpg)

如以下的测试代码，其编译后的签名为 `<<T:Ljava/lang/Number;>(TT;)V>`

```java
public static <T extends Number> void number(final T number) {} // <<T:Ljava/lang/Number;>(TT;)V>
```

### 合并泛型擦除

合并泛型擦除也属于有限制泛型擦除，不过由于其泛型定义具有多个类型，其签名也存在多个类型信息，如以下的测试代码，其编译后包含了两个类型：`<<T::Lorg/springframework/context/ApplicationContext;:Lorg/springframework/context/annotation/AnnotationConfigRegistry;>(TT;)V>`

```java
public static <T extends ApplicationContext & AnnotationConfigRegistry> void merge(final T merge) {} // <<T::Lorg/springframework/context/ApplicationContext;:Lorg/springframework/context/annotation/AnnotationConfigRegistry;>(TT;)V>
```

需要注意一点，虽然签名中保留了多个泛型信息，但是在进行反射取得方法的时候需要使用第一个类型来获取：

```java
this.getClass().getDeclaredMethod("merge", ApplicationContext.class);
```

## 泛型检查

由于泛型是在语法层面上支持的也就是说编译器上支持的，所以自然而然就要有泛型的检查，否则泛型就没有存在的意义了。

比如以下的代码：

```java
public static void main(String[] args) {
  List<String> list = new ArrayList<String>();
  list.add("123");
  list.add(123); //编译错误
}
```

由于我们定义 `List` 的元素类型是 `String`，所以当添加的类型不为 `String` 的时候，Java 编译器就会检测出来，并抛出编译错误。即使在运行时会进行 泛型擦除，`List` 可以存储任何 继承 自 `Object` 的类型，不过运行时是处于编译后，在编译期间就会对泛型的使用进行检查。

泛型检查是针对泛型的，如果原始使用的话就不会报编译错误，这是因为如果不写泛型，那么 Java 会默认泛型为 Object 。如下：

```java
public static void main(String[] args) {
  List list = new ArrayList();
  list.add("123");
  list.add(123); //编译通过
}
```

还有一种常见的泛型检查是泛型间类型的转换，如下：

```java
List<String> list1 = new ArrayList<Object>(); //编译错误
List<Object> list2 = new ArrayList<String>(); //编译错误
```

第一种转换报错的原因是因为 `Object` 类型无法转换为 `String`，如果 `List` 中存储了非 `String` 类型的对象，当我们获取的时候，Java 会默认认为 `List` 中所有对象都是 `String`，而此时如果获取它，就会抛出 `ClassCastException` 异常。因此 Java 编译器不允许此种情况的发生。

第二种虽然可以正常工作，但是如果这样转换泛型也就失去了意义，所以 Java 编译器也不允许这种情况的发生。

## 结语

这篇文章从 5 月份就开始计划写了，一直咕到了今天 🤣。

最近应该都会写一些深入一点的文章（类似这篇），框架系列就一直没写了，等过几天看看吧（逃。

## 引用

- [为什么 Java 的泛型要用擦除实现 | AndyJennifer'Blog](https://andyjennifer.com/2020/04/22/为什么Java的泛型要用擦除实现/)
- [深入探索 Java 泛型的本质 | IT 宅-arthinking's blog](https://www.itzhai.com/articles/exploring-the-nature-of-java-generics.html)
- [浅谈 Spring 泛型注入 · Clark To Do](https://clarkdo.js.org/java/spring/2014/07/03/9/)
