require.config({
    paths: {
        'jquery': 'libs/jquery',
        'underscore': 'libs/underscore',
        'backbone': 'libs/backbone'
    }
})

require(['backbone', 'router'], (B, router) => {
    // 启动backbone的路由历史记录
    B.history.start();
})