define([
    'jquery',
    'backbone',
    'text!tplNoteDetail',
    'template'
], function($, B, tpl, template) {
    'use strict';
    var View = B.View.extend({
        el: $('body'),
        template: template.compile(tpl),
        initialize: function() {
            this.render()
        },
        render: function() {
            var folderId = ''
            if (this.model.id) {
                folderId = this.model.get('folder')
            } else {
                folderId = this.model.urlRoot.split('/').splice(-1)[0]
            }

            this.$el.html(this.template({ model: this.model.toJSON(), folderId: folderId }))
        },
        events: { 'click .note-save-file': 'saveFileHandle' },
        saveFileHandle: function() {
            this.model.set('content', this.$('#content').val())
            var that = this
            this.model.on('sync', function() {
                that.undelegateEvents()
                location.href = '#folder/' + that.model.get('folder')
            })
            this.model.save()
        }
    })

    return View
});