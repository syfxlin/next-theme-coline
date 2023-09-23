---
title: C语言链表实现
slug: c-linked-list-implementation
status: publish
published_time: 2018-11-12T00:00:00.000Z
modified_time: 2021-07-28T07:39:10.020Z
layout: post
categories:
  - 折腾记录
tags:
  - Develop
  - C
---

> 先放代码，开一波坑，以后慢慢填ヾ(≧▽≦\*)o
>
> 由于我在上传的时候未进行完整测试，导致排序部分有些问题，现已修改完成。
>
> 另外排序部分只弄了 int 型的排序
>
> 改指针相关的东西真头真疼，特别是链表，折腾了一个多小时。〒 ▽ 〒
>
> 重写升级完成，这个算法目前除了排序还有用其他就没有用了，可以点[这里](https://blog.ixk.me/c-linked-list-implementation-new.html)直接跳转到重制版

```c
#include <stdio.h>
#include <malloc.h>
//链表结构
typedef struct Test
{
    int data;
    struct Test *next;
}Test,*pTest;

//头插法-创建
pTest Create_Head(int n/*链表包含节点个数*/)
{
    int i,data;
    pTest list,node;
    //创建头节点
    list = (pTest)malloc(sizeof(Test));
    list->next = NULL;
    for(i=0;i<n;i++)
    {
        //创建临时节点
        node = (pTest)malloc(sizeof(Test));
        //读入数据
        printf("请输入第%d个数据\n",i+1);
        scanf("%d",&data);
        //将数据存入临时节点的数据域中
        node->data = data;
        //将list头节点的next指针复制到node头节点的next指针
        node->next = list->next;
        //将node链表指针结合到list头节点的next指针
        list->next = node;
    }
    //初始化头节点数据
    list->data = 0;
    return list;
}

//尾插法-创建
pTest Create_End(int n/*链表包含节点个数*/)
{
    int i,data;
    pTest list,node,p;
    //创建头节点
    list = (pTest)malloc(sizeof(Test));
    list->next = NULL;
    //将副本链表指向list用来间接为list指针域赋值
    p = list;
    for(i=0;i<n;i++)
    {
        //创建临时节点
        node = (pTest)malloc(sizeof(Test));
        //读入数据
        printf("请输入第%d个数据\n",i+1);
        scanf("%d",&data);
        //将数据存入临时节点数据域
        node->data = data;
        //将副本最后的指针域指向临时节点
        p->next = node;
        //将临时节点的指针域置NULL
        node->next = NULL;
        //移动副本节点使最新的指针域成为副本链表的最后一个
        while(p->next != NULL)
        {
            p = p->next;
        }
    }
    //初始化头节点数据
    list->data = 0;
    return list;
}

//添加节点至指定位置
pTest Insert_pos(int i/*要添加到什么位置*/,pTest list/*要进行添加节点的链表*/)
{
    int data;
    pTest node,p,temp;
    //创建list链表的副本
    p = list;
    //修改位置为实际位置
    i = i - 1;
    //调整链表指针域位置,临时链表的头节点到达要添加的节点的上一个节点
    for(int u = 0; u < i; u++)
    {
        p = p->next;
    }
    //创建临时节点
    node = (pTest)malloc(sizeof(Test));
    temp = (pTest)malloc(sizeof(Test));
    //读入数据
    printf("请输入第%d个数据\n",i+1);
    scanf("%d",&data);
    //读入数据到临时节点的数据域
    node->data = data;
    //将目前节点的next即下一个节点的地址临时存起来
    temp->next = p->next;
    //把目前节点的next改为node节点，即进行插入
    p->next = node;
    //将node的next改为之前没修改时的下一个节点地址
    node->next = temp->next;
    //返回修改好的链表
    return list;
}

//添加已经拥有数据的节点
pTest Insert_pos_own(int i/*要添加到什么位置*/,pTest list/*要进行添加节点的链表*/,pTest node)
{
    int data;
    pTest p,temp;
    //创建list链表的副本
    p = list;
    //修改位置为实际位置
    i = i - 1;
    //调整链表指针域位置,临时链表的头节点到达要添加的节点的上一个节点
    for(int u = 0; u < i; u++)
    {
        p = p->next;
    }
    //创建临时节点
    temp = (pTest)malloc(sizeof(Test));
    //将目前节点的next即下一个节点的地址临时存起来
    temp->next = p->next;
    //把目前节点的next改为node节点，即进行插入
    p->next = node;
    //将node的next改为之前没修改时的下一个节点地址
    node->next = temp->next;
    //返回修改好的链表
    return list;
}

//删除指定位置的节点
pTest Delete_pos(int i/*要删除第几个节点*/,pTest list/*要进行删除节点的链表*/)
{
    pTest p,temp;
    //创建临时节点
    temp = (pTest)malloc(sizeof(Test));
    p = list;
    //调整实际位置
    i = i - 1;
    //调整链表指针域位置,临时链表的头节点到达要删除的节点的上一个节点
    for(int u = 0; u < i; u++)
    {
        p = p->next;
    }
    //将要删除的节点的下一个节点的地址存入temp的指针域
    temp = p->next->next;
    //将temp的指针域赋给要删除节点的指针域
    p->next = temp;
    //free(temp);
    //返回修改后的链表
    return list;
}

//清空链表,保留头节点
pTest Clear_List(pTest list)
{
    pTest p = list->next; //移动到第一个结点
    pTest q;
    while(p) {
        //printf("%d\t", p->data);
        q = p;
        p = p->next;
        free(q);
    }
    list->next = NULL;
    return list;
}

//遍历链表
pTest Print_List(pTest list)
{
    pTest p;
    p = list->next; //移动到存放真实数据的第一个结点
    while(p) {
        printf("%d\t", p->data);
        p = p->next;
    }
    printf("\n");
    return 0;
}

//链表逆置
pTest Resever(pTest list)
{
    pTest p, q, r;
    p = list;//P指向头结点
    q = p->next; //q指向第一个结点
    while(q->next) {
        r = q->next;
        q->next = p;
        p = q;
        q = r;
    }
    q->next = p; //连上最后一个结点
    p = list->next;
    p->next = NULL; //收尾
    list->next = q; //赋头
    return list;
}

//链表排序-从小到大
pTest Bubble_Sort(pTest list)
{
    //定义排序个数和下标的变量
    int n = 0, i, j, k;
    //定义判断链表个数的链表和用来判断大小的链表
    pTest p = list, temp;
    //判断链表的个数
    for(;p->next!=NULL;p = p->next)
    {
        n++;
    }
    //外层循环控制循环轮数
    for(i = 0; i < n; i++)
    {
        //内层循环控制每轮比较次数
        for(j = 0; j < n; j++)
        {
            //遍历比较相邻链表数据的大小
            temp = list;
            //移动比较用的链表
            for(k=0;k<j;k++)
            {
                temp = temp->next;
            }
            if(temp->data > temp->next->data)
            {
                //交换的方式是先删除大数据的节点，然后在添加回链表
                //删除大数据的节点
                list = Delete_pos(j,list);
                //将删除后的节点添加会链表的下一个节点
                list = Insert_pos_own(j+1,list,temp);
            };
        }
    }
    return list;
}

int main()
{
    pTest list = Create_End(5);
    list = Bubble_Sort(list);
    return 0;
}
```
