import { createApp } from './main';

// 返回一个函数，接收请求上下文，返回创建的vue实例
export default context => {
    // 这里返回一个promise，主要用来处理异步动作
    return new Promise((resolve, reject) => {
        // eslint-disable-next-line no-unused-vars
        const { app, router, store } = createApp();

        // 跳转到首屏地址
        router.push(context.url);

        // 等路由就绪以后继续执行
        router.onReady(
            () => {
                // 获取到所有路由以及其嵌套子路由，返回一个数组
                const routerMatch = router.getMatchedComponents();

                if (!routerMatch.length) {
                    return reject({ code: 500 })
                }

                // 有异步请求store的组件内部都有约定好的asyncData方法，返回的是一个Promise
                Promise.all(
                    routerMatch.map(component => {
                        if (component.asyncData) {
                            return component.asyncData({
                                store, // store实例
                                router: router.currentRoute // 当前路由地址
                            })
                        }
                    })
                ).then(() => {
                    // 所有异步请求结果全部返回，可以返回vue实例了

                    // 把store返回给前端，按照约定将state序列化之后返回
                    // 会被序列化在window.__INITIAL_STATE__上面
                    context.store = store;

                    resolve(app);
                }).catch(reject);
            },
            reject
        )
    })
}