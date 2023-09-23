---
title: Java链表实现
slug: java-linked-list-implementation
status: publish
published_time: 2018-11-29T00:00:00.000Z
modified_time: 2021-07-28T07:37:19.496Z
layout: post
categories:
  - 折腾记录
tags:
  - Java
  - 算法
  - Develop
---

> 转换阵营 ing，大部分的介绍都在注释写了，这里就不再重复了，注释中没有关于链表的原理，如果还不懂链表的可以先去看其他教程，这里不写主要是我比较懒(￣ ▽ ￣)"
>
> 之前的算法有问题，现在已经修改完成，并重写了部分代码，对数据域使用泛型，可以存放任何对象了，存放不同数据类型时就不再需要定义多个链表类了ヾ(≧▽≦\*)o
>
> 这个算法还有优化的空间，不久后将升级，心急的可以看 C 链表重置版然后将其改成 Java 即可

```java
package MyLinkedListDemo;

import java.util.Scanner;

public class MyLinkedListDemo {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        MyLinkedList<Integer> list = new MyLinkedList<Integer>();
        list.add(-1, 1);
        list.add(-1, 2);
        list.add(-1, 3);
        list.add(-1, 4);
        list.add(-1, 5);
        int a = list.get(2);
        System.out.println(a);
        in.close();
        }
    }

    class MyLinkedList<T> {

        //链表总长度
        int len = 0;
        // 头节点
        Node head = null;
        // 尾节点
        Node end = null;

        // 链表节点类（内部类）
        class Node {
            // 上一个节点
            Node prev;
            // 下一个节点
            Node next;
            // 数据块
            T data;

            // 空构造器，用于构造临时节点和定位节点等不需要使用数据块的节点
            Node() {
            };

            // 可填入数据的构造器，用填入数据
            Node(T data) {
                // 填入数据到数据块
                this.data = data;
            }
        }

        // 插入链表节点的方法
        // 参数i ： 表示要插入的位置，当 i = -1 时新节点会被放置头位置，若 i = -2 时新节点会被放置至尾位置
        public void add(int i /* 要添加的位置，新节点会添加至该位置之后 */, T data /* 传入数据 */) {
            // 递增定位
            len++;
            int j;
            // 定义定位节点
            Node indexNode = head;
            // 创建新节点
            Node newNode = new Node(data);

            // 判断链表是否为空
            if (head == null) {
                // 若是只需将新节点设为头节点和尾节点就行
                head = newNode;
                end = newNode;
                return;
            }

            // Create Mode
            if (i == -1) // 头插法
            {
                newNode.next = head;
                head.prev = newNode;
                head = newNode;
                return;
            } else if (i == -2) // 尾插法
            {
                while (indexNode.next != null) {
                    indexNode = indexNode.next;
                }
            }

            // Insert Mode

            // 移动定位节点至指定位置
            for (j = 0; j < i && indexNode != null; j++) {
                indexNode = indexNode.next;
            }
            // 判断是否是添加至最后一个节点
            if (indexNode.next == null) {
                // 将上一个节点next指向新节点
                indexNode.next = newNode;
                // 将新节点的prev指向上一个节点
                newNode.prev = indexNode;
                // 将新节点的next指向null
                newNode.next = null;
                // 将新节点设为尾节点
                end = newNode;
                return;
            }
            // 创建临时节点用于存储原下一个节点的地址
            Node tempNode = indexNode.next;
            // 将上一个节点的next指向新节点
            indexNode.next = newNode;
            // 将新节点的next指向原下一个节点
            newNode.next = tempNode;
            // 将新节点的prev指向上一个节点
            newNode.prev = indexNode;
            // 将原下一个节点的prev指向新节点
            tempNode.prev = newNode;
        }

        // 插入带数据的链表到指定位置,操作方式同add，只是新增的节点是已经有数据的
        public void add(int i, Node haveNode) {
            len++;
            int j;
            Node indexNode = head;

            if (i == -1) {
                haveNode.next = head;
                head.prev = haveNode;
                head = haveNode;
                return;
            }

            for (j = 0; j < i && indexNode != null; j++) {
                indexNode = indexNode.next;
            }

            if (indexNode.next == null) {
                indexNode.next = haveNode;
                haveNode.prev = indexNode;
                haveNode.next = null;
                end = haveNode;
                return;
            }

            haveNode.next = indexNode.next;
            haveNode.next.prev = haveNode;
            haveNode.prev = indexNode;
            indexNode.next = haveNode;
        }

        // 删除指定节点
        // 参数 i ： 当 i = 0 时代表删除第一个节点，i = -1 时代表删除最后一个节点
        public void delete(int i/* 要删除节点的位置 */) {
            len--;
            // 判断是否是删除第一个节点
            if (i == 0) {
                // 将头节点指向第二个节点，然后将头节点的prev设置为null，这样就屏蔽掉了第一个节点
                head = head.next;
                head.prev = null;
                return;
            }
            // 若是删除最后一个节点，那只需将尾节点移到倒数第二个节点即可
            else if (i == -1) {
                end = end.prev;
                end.next = null;
                return;
            }

            // 递增定位
            int j;
            // 创建定位节点，将其指向头节点
            Node indexNode = head;
            // 将定位节点移至要删除节点的上一个节点
            for (j = 0; j < i - 1 && indexNode != null; j++) {
                indexNode = indexNode.next;
            }
            // 判断要删除节点是否是最后一个节点
            if (indexNode.next.next == null) {
                // 操作方式同删除头节点与
                end = end.prev;
                end.next = null;
                return;
            }
            // 要删除节点的下一个节点prev设置为要删除节点的上一个节点
            indexNode.next.next.prev = indexNode;
            // 将要删除节点的上一个节点的next设置为要删除节点的下一个节点
            indexNode.next = indexNode.next.next;
        }

        // 清空链表
        public void clear() {
            len = 0;
            // 清空链表只需将头节点和尾节点设置为null即可，内存会由垃圾回收器回收
            head = null;
            end = null;
        }

        // 遍历输出链表数据
        public void print() {
            // 创建定位节点
            Node indexNode = head;
            // 使用while循环进行遍历
            while (indexNode != null) {
                // 输出数据
                System.out.print(indexNode.data.toString() + " ");
                // 移动定位节点
                indexNode = indexNode.next;
            }
            // 换行
            System.out.println();
        }

        // 链表逆置
        public void resever() {
            // 创建临时节点用来临时存储指向数据
            Node tempNode = new Node();
            // 将头节点与尾节点交换
            tempNode = head;
            head = end;
            end = tempNode;
            // 创建定位节点
            Node indexNode = head;
            // 循环交换next和prev数据
            while (indexNode.prev != null && (indexNode.next != null || indexNode == head)) {
                tempNode = indexNode.next;
                indexNode.next = indexNode.prev;
                indexNode.prev = tempNode;
                indexNode = indexNode.next;
            }
            // 设置最后一个节点的next为null
            end.next = null;
            // 设置最后一个节点的prev数据
            end.prev = tempNode.next;
        }

        // 添加新节点到列表末尾
        public void addFirst(T data) {
            this.add(-2, data);
        }

        // 添加新节点到列表头
        public void addLast(T data) {
            this.add(-1, data);
        }

        // 获取指定位置的数据
        public T get(int i) {
            Node indexNode = head;
            for (int j = 0; j < i; j++) {
                indexNode = indexNode.next;
            }
            return indexNode.data;
        }

    }
```
