---
title: 为React添加简单的Store
slug: add-simple-store-for-react
status: publish
published_time: 2019-11-29T00:00:00.000Z
modified_time: 2021-07-28T07:12:28.551Z
layout: post
categories:
  - 折腾记录
tags:
  - JavaScript
  - React
---

## 前言

前几天打算使用 React 开发一个博客系统，由于有许多数据都是要共用的，比如 Tags，Categories 等，而 React 相比 Vue 会组件嵌套的情况会更严重，如果将数据一个个转发势必会造成代码逻辑过于复杂，耦合度过高，所以，我们需要全局状态管理。React 有一个好伙伴 Redux，Redux 是一个用于应用程序状态管理的开源 JavaScript 库。但是 Redux 相对复杂，需要编写太多模板代码，而博客系统这种轻应用并没必要使用 Redux。这时就需要自制一个简单的 Store 来管理全局状态。

## 分析

在正式编写代码之前我们需要先分析一下我们的 Store 需要什么功能，以及结构。

首先 Store 需要有 State 来存储数据，Action 来触发全局的事件，以及对 State 的更改，我们并不需要 Reduce，有 Reduce 可以很好的分辨 State 的变动，但是我们的应用并没有这么复杂，所以并不需要多一步 Reduce 来改变 State。

由于我使用过 Redux 和 Vuex，通过对比可以发现 Vuex 的 Action 调用相对简单灵活，但是并不能很好的应对同步的场景，所以为了后期的开心编码，我们需要结合二者的一些优点。

React 在 16.x 添加了 Context，使得我们在组件树中传递数据能够简单的实现，我们只需要将 root 组件的状态作为全局状态通过 Context 传递下去即可。

## 实现

首先，我们需要初始化 State 和 Action，或许你会对下方的 this 感到疑惑，耐心看完下面的代码就能理解了。

```javascript
// initialStore.js

export const initialState = {
  count: 1,
};

export const initialActions = {
  addCount() {
    this.setState({ ...this.state, count: this.state.count + 1 });
  },
};
```

然后我们需要导入 initialStore 并创建 Context，同时导出 Context，用于子组件

```javascript
import React from "react";
import { initialActions, initialState } from "./initialStore";

export const StoreContext = React.createContext({
  state: initialState,
  actions: initialActions,
});
```

这时我们就能创建一个 Store 组件来存储和转发 Context

```javascript
export default class StoreProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.actions = initialActions;
    for (const key in this.actions) {
      this.actions[key] = this.actions[key].bind(this);
    }
  }

  render() {
    return (
      <StoreContext.Provider
        value={{
          state: this.state,
          actions: this.actions,
        }}
      >
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}
```

使用 Class 组件的原因是为了将该组件的 this 绑定到 Action 上，这样 Action 就能通过 this.state 和 this.setState 操作读取 State 了，你也可以使用 Hook 来达到相同的目的，只是需要利用 useRef 来防止函数读取到旧的状态，使用起来比 Class 复杂，所以这里直接使用 Class 了。

## 改进

使用全局状态管理在调试的时候不太容易跟踪状态的变化，所以我们需要在状态变化的时候打印变动信息，让调试更方便。

```javascript
export default class StoreProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    if (process.env.NODE_ENV === "development") {
      this.defSetState = this.setState;
      this.setState = this.debugSetState;
    }
    this.actions = initialActions;
    for (const key in this.actions) {
      this.actions[key] = this.actions[key].bind(this);
    }
  }

  debugSetState(newState) {
    try {
      throw new Error("[!] - 检查到未被移除的Log调用:");
    } catch (e) {
      console.log({
        oldState: this.state,
        newState: newState,
        dispatchAction: e.stack,
      });
    }
    if (window.__REACT_DISPATCH_SHOW_TRACE__) {
      console.trace();
    }
    this.defSetState(newState);
  }

  render() {
    return (
      <StoreContext.Provider
        value={{
          state: this.state,
          actions: this.actions,
        }}
      >
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}
```

在 setState 注入输出日志，我们就能在控制台清晰的看到状态的改变，以及执行栈。

## 那么，如何使用呢？

使用其实就是从 Context 提取出 State 和 Action，把它们当成变量和函数执行即可

```javascript
const store = useContext(StoreContext);
const { count } = store.state;
const { addCount } = store.actions;

//...

<button onClick={() => addCount()}>{count}</button>;
```
