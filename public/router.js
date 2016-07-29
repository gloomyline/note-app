define(['backbone', 'folderController', 'noteListController', 'noteDetailController'],
    (B, folderCon, noteListCon, noteDetailCon) => {
        var Router = B.Router.extend({
            // 定义路由信息
            // 路由地址：执行函数
            routes: {
                '': 'folderList',
                'folder/:id': 'folder',
                'note/:folder': 'note',
                'note/:folder/:id': 'note'
            },
            folderList: function() {
                folderCon.init()
            },
            folder: function(id) {
                noteListCon.init(id)
            },
            note: function(folder, id) {
                noteDetailCon.init(folder,id)
            }
        })

        var router = new Router()
        return router
    })