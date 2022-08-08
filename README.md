# web Music

模仿网易云音乐网页版应用，自己写一个web music by React 全家桶。

# 目录结构
- `assets` 存放静态资源
- `common` 存放公共常量、数据
- `components` 存放公共组件
- `network` 进行网络请求的操作
- `pages` 存放路由组件页面
- `router` 存放 路由配置
- `store` 使用redux
- `utils` 存放该项目使用的工具类

# 项目配置
1. 进行CSS重置，使用 normalize.css，清除body自带的边距，ul、li的样式、a标签下划线等。
   ```bash
   npm i normalize.css -S
   ```
   在 assets/css/reset.css 中引入normalize.css，然后再加其他样式。
2. 配置路径别名
   使用 craco 库，在 craco.config.js 中配置
   ```bash
   npm i @craco/craco
   ```
3. 配置路由
   ```bash
   npm i react-router-dom
   npm i react-router-config
   ```
   router/index.js 中配置
4. 使用 styled-components，解决样式冲突
   ```bash
   npm i styled-components
   ```
   样式文件 style.js
5. 使用 antd 组件库中的某些组件
   Input 组件
   ```bash
   npm install antd --save
   # 图标
   npm install --save @ant-design/icons
   ```
6. axios
   进行网络请求
   ```bash
   npm i axios -S
   ```
7. redux
   使用 redux 存储数据
   ```bash
   # 下载 redux、react-redux、redux-thunk
   npm i redux react-redux redux-thunk -S
   ```

8. 存储服务器数据
   - 组件自身的数据存储在自身的 state 中
   - 从服务器请求到的数据，存储到 redux 中

9. 解决数据不可变问题
   在 redux 中存储大量数据，当其中一点数据改变时，就需要浅拷贝{...xxxx},返回新的对象数据，这很浪费性能。
   解决：使用 ImmutableJS，每次修改对象数据时，不会改变原对象，而是生成一个新对象，新对象尽最大可能复用原对象
   ```bash
   npm i immutable
   ```
10. audio 标签的事件
- onTimeUpdate 播放音频时间更新触发的回调
- onEnded   音乐播放完毕触发的回调

11. 路由懒加载
   ```js
   import React, { lazy } from "react";
   const Discover = lazy(() => import("@/pages/discover"));
   ```

# 页面结构
组件均使用函数组件 + Hook
## components

1. APPHeader组件 -----顶部栏
   存放路由导航，全局组件
   
2. APPFooter组件 -----尾部栏
   放底部信息栏，全局组件

3. TopTitle-Rcm 组件
   推荐路由中---的头部标题组件

4. SongCover 组件
   歌曲封面组件

5. AlbumCover 组件
   新碟封面组件

6. TopRanking 组件
   发现板块---榜单数据的展示组件

## pages
1. player ---为页面底部的播放控件


# 开发遇到的问题
1. "发现音乐"为父级路由(路径为`/discover`)，然后子级路由有"推荐"(为重定向所到的子路由`/discover/recommend`)，当点击发现音乐时，重定向完成了，但是发现音乐的 active 丢了。
**解决**：发现是父级路由 NavLink 开启了 exact 严格匹配。

2. 歌曲播放滑到进度条时，松手后，进度条会回弹，然后再到松手时的位置
**解决**：出现该情况的原因是松手后的回调函数中要再次设置一次当前currentTime，而audio元素需要的currentTime是==秒==数，而我设置的state的currentTime是==毫秒==数，所以`setCurrentTime`中的参数是currentTime * 1000，即为毫秒值。

3. 歌曲切换了，不能自动播放
原因：浏览器现在禁止音频自动播放
解决：
```js
audioRef.current.play().then(res => {
      setIsPlaying(true);
    }).catch(err => {
      setIsPlaying(false);
    });
```
