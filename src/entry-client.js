// 客户端要做的事
// 将服务端序列化的静态store从__INITIAL_STATE__上拿出来，范旭路恶化解析
// 在路由渲染完成后将app挂载

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
