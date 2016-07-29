define([
    'backbone'
], function(B) {
    'use strict';
    var Model = B.Model.extend({
        defaults: {},
        parse: function(res) {
            console.log(res)
            this.set(res.data)
            return res.data
        }
    })

    var Collection = B.Collection.extend({
        url: '/noteFolder',
        model: Model,
        parse: function(res) {
            this.set(res.data)
            return res.data
        }
    })

    return { Model: Model, Collection: Collection }
});