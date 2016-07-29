define([
    'noteFolder',
    'folderView'
], function(Model, View) {
    'use strict';
    var Controller = {
        init: function() {
            var c = new Model.Collection()
            c.fetch({ reset: true })
            c.on('reset', function() {
                new View({ collection: c })
            })
        }
    }

    return Controller
});