define([
    'note',
    'noteDetailView'
], function(Model, View) {
    'use strict';
    var Controller = {
        init: function(folder, id) {
            var m = new Model.Model({ id: id })
            m.urlRoot = '/note/' + folder
            if (id) {
                m.fetch()
                m.once('change', function() {
                    new View({ model: m })
                })
            } else {
                new View({ model: m })
            }
        }
    }

    return Controller
});