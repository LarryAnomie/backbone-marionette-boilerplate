/* global define, Modernizr */

define([
    'jquery',
    'lodash',
    'backbone',
    'marionette',
    'Views/ExtendView',
    '../../bower_components/requirejs-text/text!../../templates/sprint.html'
], function ($, _, Backbone, Marionette, ExtendView, tmpl) {

    'use strict';

    var SprintView = ExtendView.extend({

        id: 'sprint-page',

        className : 'page--sprint',

        initialize: function (options) {

            if (options.page) {
                this.$el.addClass('page');
            }

        },

        /**
         * clean up view.
         */
/*        remove: function () {

            console.log('view remove fn')

            // don't forget to call the original remove() function
            Backbone.View.prototype.remove.call(this);
        },*/

        render: function () {

            var template = _.template(tmpl);

            this.$el.html(template());

            return ExtendView.prototype.render.apply(this, arguments);

        }

    });

    return SprintView;

});
