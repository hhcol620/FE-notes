# vueRouter v3.5.3


## vue-router插件介绍：
* Vue官方提供在某些时机控制页面或者说组件的切换的插件
* 插件官方网站：[VueRouter官网](https://router.vuejs.org/zh/guide/)

##  简单使用
* 导入VueRouter
    ``` javascript
    import VueRouter from 'vue-router' 
    ```
* Vue.use(VueRouter) 这一步Vue做了什么？
    ```javascript
    Vue.use(VueRouter)
    ```
* new VueRouter(config), 传入配置项，VueRouter会根据这些配置项做什么？
    ```javascript
    const router = new VueRouter({
        mode: 'hash',
        base: __dirname,
        routes: [
            { path: '/', component: Home },
            { path: '/foo', component: Foo },
            { path: '/bar', component: Bar }
        ]
    })
    ```
* 将上一步实例化对象做配置项传入new Vue(config);
    ```javascript
    const vueInstance = new Vue({
        router,
        render: (h) => h(App) // App为根组件
    }).$mount('#app');
    ```
## 插件内部做了哪些事？
* 整理简单使用过程中疑问
    1. Vue.use(VueRouter) 这一步VueRouter插件做了什么工作？ 
    2. new VueRouter()的过程中，我们传入的配置项有什么作用？
    3. 将上一步生成的router当做配置项传入new Vue()，这一步Vue做了什么？（这部分留到解读Vue源码）

## 首先Vue.use做了什么？
* 调用传入的VueRouter上面的静态方法install，并传入Vue
* install 方法中通过全局混入的方式给每个组件的生命周期钩子beforeCreate中获取router配置项，并调用router上的init方法
* 给Vue.prototype.$router和Vue.prototype.$route 设置值(这里的做法并不是直接设置，而是使用了访问器属性)
    ```javascript
    Object.defineProperty(Vue.prototype, '$router', {
        get () { return this._routerRoot._router }
    })
    Object.defineProperty(Vue.prototype, '$route', {
        get () { return this._routerRoot._route }
    })
    ```
* 通过Vue.component在全局声明两个组件

## 传入new VueRouter中的配置项及作用
* 传入配置项内容
    ```javascript
    {
        mode: 'hash',
        base: __dirname,
        routes: [
            { path: '/', component: Home },
            { path: '/foo', component: Foo },
            { path: '/bar', component: Bar }
        ]
    }
    ```

* 看下VueRouter的构造函数 [VueRouter构造函数](https://github.com/vuejs/vue-router/blob/dev/src/index.js#L41-L79)
    ``` javascript
    construcor(options) {
        this.options = options
        this.matcher = createMatcher(options.routes || [], this)
        let mode = options.mode || 'hash'
        if(mode === 'hase') {
            // 这个里面的第二个参数可以先不用去关注
            this.history = new HashHistory(this, options.base, this.fallback)
        }
    }
    ```
* 构造函数中主要做了以下3件事
    1. 将`options`存放在实例属性中
    2. 构建matcher
        * 通过调用 `createRouteMap` 构建`pathList`, `pathMap`, `nameMap`

            ::: tip 提示
            1. pathList 是一个有路由配置参数中routes数组每项中的path 组成
            2. pathMap 是一个由path作为key, record作为value的对象 (record为一个对象)
            3. nameMap 是一个由name作为key, record作为value的对象 (record为一个对象)
            :::

        * 返回是一个包含四个方法的对象 addRoute, addRoutes, getRoutes, match

            ::: tip 提示
            1. addRoute 添加单个路由
            2. addRoutes 调用createRouteMap，并把routes, pathList, pathMap, nameMap作为参数传入，会将routes按照规范处理，将处理后的结果添加到后面三个参数中
            3. getRoutes 返回由record组成的数组
            4. match 遍历pathList，根据record上的正则和path对比，获取path中的params，并设置到location上，并最终返回`createRoute`构建的对象 (不考虑name存在的情况)
            :::

    3. 实例化`history`mode值为hash
        * 实例化的是`HashHistory`，传入参数 `this, options.base, this.fallback` 第三个参数可以先不用关注， 想了解可以看[fallback](https://github.com/vuejs/vue-router/blob/dev/src/index.js#L54-L69)
        * `HashHistory` 继承自 `History`
        * `HashHistory` 构造函数中调用`ensureSlash`确保hash是以/开头，如果不是，vue-router会补充'/'， 并通过history.replaceState()这个方法去替换历史记录
            ::: tip 提示
            例如原来的浏览器地址栏为 `http://localhost:8080/hash-mode/#foo`，光标放到地址栏回车之后，代码执行到 `ensureSlash`，浏览器地址栏中的url会被替换为 `http://localhost:8080/hash-mode/#/foo`
            :::
        * `HashHistory`上的几个重要的方法
            1. setupListeners
            2. push
            3. replace
            4. go
            5. getCurrentLocation
            6. ensureURL
        * `History` 构造函数创建实例属性 this.router, this.base, this.current, 还有一些钩子 ....
            ::: tip 提示
            `this.base = normalizeBase(base)`
            normalizeBase()作用1. 是无base的时候从base标签上的href获取 2. 判断base开头是不是/， 不是的情况下头部补充/ 3. 把base中的尾部的/的删除
            :::
        * `History` 上的几个重要的方法
            1. listen
            2. onReady
            3. onError
            4. transitionTo
            5. confirmTransition
            6. updateRoute
            7. teardown





## 两个自带组件的功能和原理
* router-view
    1. balabala......
* router-link
    1. balabala.......

