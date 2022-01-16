# vueRouter


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
* 传入配置项
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

## 两个自带组件的功能和原理
* router-view
    1. balabala......
* router-link
    1. balabala.......

