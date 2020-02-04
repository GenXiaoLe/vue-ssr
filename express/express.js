// 1. 引入 express
// 2. 调用 express 返回实例
// 3. 监听启用端口
// 4. 控制台使用node xxx.js 指令启动

// 1. 引入vue-server-renderer
// 2. 调用createBundleRenderer方法返回创建实例
// 3. renderToString 传入 vue实例 由于返回是个promise 直接调用then 接受数据 输出

// 引入favicon 使用server.use处理favicon地址
const express = require('express');
const path = require('path');
const server = express();
const fs = require('fs');

// 获取绝对路由函数
function resolve(dir) {
    // 把当前执行js文件绝对地址和传入dir做拼接
    return path.resolve(__dirname, dir);
}

// 获取渲染器 createBundleRenderer 里面有客户端的激活信息 服务端的包
const { createBundleRenderer } = require('vue-server-renderer');
// 参数1是服务端的的包
// 参数2是一个options 需要一个runInNewContext必填，宿主文件 静态文件template，客户端包
const serveBundle = require(resolve('../dist/server/vue-ssr-server-bundle.json'));
const renderer = createBundleRenderer(
    serveBundle,
    {
        runInNewContext: false,
        template: fs.readFileSync(resolve('../public/index.html'), 'utf-8'), // 宿主文件
        clientManifest:  require(resolve('../dist/client/vue-ssr-client-manifest.json') )
    }
);

// 处理favicon
const favicon = require('serve-favicon');
server.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));

// 静态资源处理
// 第二个参数是不需要 
server.use(express.static(resolve('../dist/client'), {index: false}));

server.get('*', async (req, res) => {
    // 构造上下文
    const context = {
        titile: 'ssr test',
        url: req.url // 首屏地址
    }

    try {
        // 渲染输出
        // 内部会调用服务端入口entery-server的函数
        const html = await renderer.renderToString(context);

        // 输出服务端html
        res.send(html);
    } catch(error) {
        res.status(500).send('服务器渲染出错');
    }
})

server.listen('8080', () => {
    // eslint-disable-next-line no-console
    console.log('server running');
})
