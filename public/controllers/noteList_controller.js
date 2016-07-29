define([
    'note',
    'noteListView'
], function(Model, View) {
    'use strict';
    var Controller = {
        init: function(id) {
            var c = new Model.Collection()
            c.url = '/note/' + id
            c.fetch({ reset: true })
            c.once('reset', function() {
                new View({ collection: c })
            })
        }
    }

    return Controller
});