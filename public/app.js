require.config({
    paths: {
        'jquery': 'libs/jquery',
        'underscore': 'libs/underscore',
        'backbone': 'libs/backbone',
        'text': 'libs/text',
        'template': 'libs/template',
        'router': 'router',
        'alert': 'libs/alert/js/alert',
        'note': 'models/note',
        'noteFolder': 'models/noteFolder',
        'folderController': 'controllers/folder_controller',
        'noteListController': 'controllers/noteList_controller',
        'noteDetailController': 'controllers/noteDetail_controller',
        'folderView': 'views/folder_view',
        'noteListView': 'views/noteList_view',
        'noteDetailView': 'views/noteDetail_view',
        'tplFolder': 'tpl/folder.html',
        'tplNoteList': 'tpl/noteList.html',
        'tplNoteDetail': 'tpl/noteDetail.html'
    }
})

require(['backbone', 'router'], (B, router) => {
    // 启动backbone的路由历史记录
    B.history.start();
})