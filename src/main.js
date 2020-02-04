import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router/index';
import { createStore} from './store/index';

Vue.config.productionTip = false

// 如果其他组件也有这个方法，但首屏渲染无法进行处理，需要用全局混入来检测，处理
Vue.mixin({
  beforeMount() {
    const { asyncData } = this.$options;

    if (asyncData) {
      this.dataPromise = asyncData({
        store: this.$store,
        router: this.$router
      })
    }
  }
})

export function createApp(context) {
  // 创建router store实例
  const router = createRouter();
  const store = createStore();

  const app = new Vue({
    router,
    store,
    context,
    render: h => h(App),
  })

  return { router, app, store }
}
