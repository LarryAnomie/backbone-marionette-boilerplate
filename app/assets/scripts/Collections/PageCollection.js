/*global define */

define([
    'backbone',
    'models/PageModel'
], function (Backbone, PageModel) {
    'use strict';

    return Backbone.Collection.extend({
        model: PageModel
    });
});
