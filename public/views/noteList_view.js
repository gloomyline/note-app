define([
    'jquery',
    'backbone',
    'text!tplNoteList',
    'template',
    'note'
], function($, B, tpl, template, Model) {
    'use strict';
    var View = B.View.extend({
        el: $('body'),
        template: template.compile(tpl),
        initialize: function() {
            this.render()
        },
        render: function() {
            var folderId = this.collection.url.split('/').splice(-1)[0]
            var arr = this.collection.models.map(function(item) {
                return item.toJSON()
            })
            this.$el.html(this.template({ model: arr, folderId: folderId }))
        }
    })

    return View
});