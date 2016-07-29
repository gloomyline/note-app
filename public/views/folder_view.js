define([
    'jquery',
    'backbone',
    'text!tplFolder',
    'template',
    'noteFolder',
    'alert'
], function($, B, tpl, template, Model, Alert) {
    var View = B.View.extend({
        el: $('body'),
        template: template.compile(tpl),
        initialize: function() {
            this.render()
        },
        render() {
            var arr = this.collection.models.map(function(item) {
                return item.toJSON()
            })
            this.$el.html(this.template({ model: arr }))
        },
        events: {
            'click .note-create-dir': 'addFolderHandle'
        },
        addFolderHandle: function() {
            var that = this
            var p = new Alert.Prompt('新建文件夹', function(dirName) {
                that.collection.create(new Model.Model({ name: dirName, count: 0 }), { wait: true })
                that.listenToOnce(that.collection, 'sync', function(model) {
                    location.href = ''
                })
            })
            p.show();
        }
    })

    return View
});