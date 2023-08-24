---
title: C 归并排序
slug: c-merge-sort
status: publish
published_time: 2018-11-20T00:00:00.000Z
modified_time: 2021-07-28T07:38:39.544Z
layout: post
categories:
  - 折腾记录
tags:
  - 算法
  - Develop
  - C
---

> 懒得写开头，过几天应该会添加(￣ ▽ ￣)"

终于将排序算法修复完成啦！！！，目前已经不需要判断是否是奇数个了ヾ(≧▽≦\*)o

```c
#include <stdio.h>
#include <limits.h>
#define N 15 //定义要排序的数组个数
//归并排序控制Demo
//归并排序函数
int* Merge_Sort(int n, int nums[])
{
    //创建临时存储结果的数组，若不创建在交换部分会复杂许多
    int nums_temp[N+1];
    int u, i, m, x, y, j;
    //外层循环，控制排序的总轮数
    for(u = 1; u < n; u*=2)
    {
        //将临时数组的索引下标归零，即回到第一个元素
        m=0;
        //内层循环，控制各组进行比较
        for(i = 0; i < n; i = i + u*2)
        {
            x = 0;
            y = 0;
            //两组进行归并，当有一组元素为空时结束归并
            while(x<u&&y<u&&i+x<n&&i+u+y<n)
            {
                //判断元素大小，小的元素排前，同时移动临时数组下标
                if(nums[i+x] > nums[i+u+y])
                {
                    nums_temp[m] = nums[i+u+y];
                    y++;
                    m++;
                }
                else
                {
                    nums_temp[m] = nums[i+x];
                    x++;
                    m++;
                }
            }
            //判断最后残留的元素，将残留元素归并（残留元素即两组之中最后一个不需要比较的元素）
            if(x == u)
            {
                for(j=y;j<u;j++)
                {
                    nums_temp[m] = nums[i+u+j];
                    m++;
                }
            }
            else
            {
                for(j=x;j<u;j++)
                {
                    nums_temp[m] = nums[i+j];
                    m++;
                }
            }
        }
        //将临时数组的元素复制回原数组，注意这里不能直接等于
        for(i = 0; i < n; i++)
        {
            nums[i] = nums_temp[i];
        }
    }
    //返回排序好的数组
    return nums;
}

int main(int argc, char const *argv[])
{
    //要进行排序的数组
    int nums[N] = {3,4,-9,0,4,5,4,2,9,23,22,20,45,-10};
    int i;
    //调用归并排序函数
    int *p = Merge_Sort(N, nums);
    //循环输出，输出实际个数，奇数数组添加的元素就被屏蔽了
    for(i = 0; i < N; i++)
    {
        printf("%d ", p[i]);
    }
    return 0;
}
```
