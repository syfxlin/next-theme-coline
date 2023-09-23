---
title: C 快速排序
slug: c-quick-sort
status: publish
published_time: 2018-11-27T00:00:00.000Z
modified_time: 2021-07-28T07:37:55.590Z
layout: post
categories:
  - 折腾记录
tags:
  - Develop
  - 算法
  - C
---

> 开头和介绍都是不存在的（￣︶￣）↗

这次是真修复了，坑爹呀，LintCode 提交了好几次，终于 AC 了，应该是没问题了 ≧ ﹏ ≦，另外我这代码只能算还行只打败了 51%的提交 （捂脸

```c
#include <stdio.h>
#define N 10 //定义要排序的数组个数

//快速排序控制Demo

//快速排序函数
int* Quick_Sort(int left, int right, int nums[])
{
    //定义标记，并设置标记为排序数组最末端，即right的后一个数
    int pivot = right + 1;
    //存储最左端，为下一轮存储left标记
    int left_temp = left;
    //临时交换数
    int temp;
    //判断left标记是否已经到达right或right之后，若是则代表此轮排序的判断部分已经完成
    while(left < right)
    {
        //判断left标记的数是否小于标记的数，若是则向右移动left标记
        while(nums[left] < nums[pivot])
        {
            left++;
            if(left > right) break;
        }
        //判断right标记是否大于标记的数，若是则向左移动right标记
        while(nums[right] > nums[pivot])
        {
            right--;
            if(left > right) break;
        }
        //若left标记不小于right则代表此轮已经完成
        if(left >= right) break;
        //若不是，则将left和right标记数交换
        temp = nums[left];
        nums[left] = nums[right];
        nums[right] = temp;
    }
    //判断标记数是否是最大的，即left标记是否已经到达标记数，若不是则交换left标记数与标记数
    if(nums[left] >= nums[pivot])
    {
        temp = nums[left];
        nums[left] = nums[pivot];
        nums[pivot] = temp;
    }
    //判断是否要进行下一轮，若是则进行下一轮
    if(left_temp < left - 1) Quick_Sort(left_temp, left - 2, nums);
    if(left + 1 < pivot) Quick_Sort(left + 1, pivot - 1, nums);
    //返回排序好的数组
    return nums;
}

int main(int argc, char const *argv[])
{
    //定义要进行排序的数组
    int nums[N] = {5, 4, 7, 12, 4, 9, 2, 1, 13, 2};
    //设置数组长度
    int n = 10;
    //调用排序函数并将排序好的头指针传给p
    int *p = Quick_Sort(0, n - 2, nums);
    int i;
    //循环输出排序好的数组
    for(i = 0; i < n; i++)
    {
        printf("%d ",p[i]);
    }
    return 0;
}
```
