import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/page/home';
import About from '@/page/about';

Vue.use(VueRouter);

// 要用一个工厂函数 这里因为服务端渲染，客户端有多个，为了避免数据污染
export function createRouter() {
    return new VueRouter([
        {
            path: '/',
            name: 'home',
            components: Home
        },
        {
            path: '/about',
            name: 'about',
            components: About
        }
    ]);
}