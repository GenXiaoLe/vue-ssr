import { createApp } from './main';

const { app, router, store } = createApp();

// 判断是否存在state，是否需要反序列化，从window.__INITIAL_STATE__上面获取
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
}

// 等路由就绪之后挂载vue实例并激活
router.onReady(
    () => {
        //第二个参数是指是否激活ssr渲染
        app.$mount('#app', true);
    }
)
