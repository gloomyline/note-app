define(['backbone'], (B) => {
    var Router = B.Router.extend({
        // 定义路由信息
        // 路由地址：执行函数
        routes: {
            '': 'index'
        },
        index: function() {

        }
    })

    var router = new Router()
    return router
})