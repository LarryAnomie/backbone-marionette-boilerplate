/*global define */

define([
    'backbone',
    'models/ProjectModel'
], function (Backbone, ProjectModel) {
    'use strict';

    return Backbone.Collection.extend({
        model: ProjectModel,

        url : '/api/projects.json'
    });
});
