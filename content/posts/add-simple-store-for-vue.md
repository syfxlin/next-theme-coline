---
title: 为Vue添加简单的Store
slug: add-simple-store-for-vue
status: publish
published_time: 2019-12-03T00:00:00.000Z
modified_time: 2021-07-28T07:12:04.638Z
layout: post
categories:
  - 折腾记录
tags:
  - Vue
  - Vuex
  - JavaScript
---

## 前言

没错，我又来水文章了，Vue 的简单 Store 其实比 React 的简单 Store 更早就制作好了并已用在了XK-Editor@1.3.0上，只是没有写到博客上而已，这次正好写了 React 的简单 Store，顺便就把 Vue 的也补上。至于为什么要用 Store 或者为什么不用 Vuex，其实和 React 的差不多，这里就不说了，如果不了解可以移步上一篇 [为 React 添加简单的 Store](https://blog.ixk.me/add-simple-store-for-react.html)

## 分析

Vue 的简单 Store 和 React 的差不多，只是 React 改变 State 的叫 Reduce，Vue 叫 Mutation，同样简单 Store 并不需要这部分来增加代码的复杂性，在 Vue 的官方文档的状态管理中有说明如何创建一个简单的 Store，但是那个例子并不够完整，而且需要挂载到根节点 data 中，访问也过于复杂需要使用`this.$root.shareState`冗长的访问方式，所以我们需要改进这部分来提高 Store 的实用性。参照 Vuex 的使用方式我们可以同 Vuex 一样添加`mapState`和`mapActions`来进行简单的调用，由于 Vue 提供了`Vue.observable`的方法来创建响应式数据，所以我们就不需要将 Store 挂载到根组件，而是可以和组件分离独立的工作。

## 实现

首先，我们需要引入 Vue，同时初始化 State 和 Actions

```javascript
import Vue from "vue";

const state = Vue.observable({
  count: 0,
});

const actions = {
  addCount() {
    // 由于已经使用了Vue.observable来初始化State,所以这时的State已经拥有响应式，所以可以直接对其进行修改
    state.count++;
  },
};

const store = {
  state,
  actions,
};

export default store;
```

然后我们需要编写对应的 map 方法，同时将 map 方法导出

```javascript
export const mapState = (states) => {
  let ret = {};
  if (states instanceof Array) {
    for (let i = 0; i < states.length; i++) {
      ret[states[i]] = {
        get() {
          return store.state[states[i]];
        },
        set(value) {
          store.state[states[i]] = value;
        },
      };
    }
  } else {
    for (const key in states) {
      if (states[key] instanceof Function) {
        ret[key] = {
          get() {
            return states[key](store.state);
          },
        };
      } else {
        ret[key] = {
          get() {
            return store.state[states[key]];
          },
          set(value) {
            store.state[states[key]] = value;
          },
        };
      }
    }
  }
  return ret;
};

export const mapActions = (actions) => {
  let ret = {};
  if (actions instanceof Array) {
    for (let i = 0; i < actions.length; i++) {
      ret[actions[i]] = store.actions[actions[i]];
    }
  } else {
    for (const key in actions) {
      if (actions[key] instanceof Function) {
        ret[key] = actions[key](store.actions);
      } else {
        ret[key] = store.actions[actions[key]];
      }
    }
  }
  return ret;
};
```

由于该 Store 制作较早，所以并没有考虑到添加打印 State 变动，如有需要可以参考 React 的方式添加 debug 输出。

## 那么，如何使用呢？

同 Vuex 的使用方式，在对应的组件中导入 Store 的 map 方法，然后就可以同 Vuex 一样对 State 和 Actions 进行操作了

```javascript
import { mapState, mapActions } from "./store";

export default {
  computed: {
    ...mapState(["count"]),
  },
  methods: {
    ...mapActions(["addCount"]),
  },
};
```
