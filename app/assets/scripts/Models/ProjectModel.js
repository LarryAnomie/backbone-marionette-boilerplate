/*global define */

define([
    'backbone'
], function (Backbone) {

    'use strict';

    return Backbone.Model.extend({

        defaults: {
            title: 'Project title',
            content: 'Project content',
            client : 'test client',
            pubDate : '',
            name: 'project-name'
        },

        initialize: function () {

        }
    });
});
