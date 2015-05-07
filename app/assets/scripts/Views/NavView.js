/* global define, Modernizr */

define([
    'jquery',
    'lodash',
    'backbone',
    'Views/ExtendView',
    'nprogress',
    '../../bower_components/requirejs-text/text!../../templates/week.html'
], function ($, _, Backbone, ExtendView, NProgress, tmpl) {

    'use strict';

    var WeekView = ExtendView.extend({

        className: 'week-page',

        id: 'week-page',

        initialize: function () {
            var self = this;

        },


        /**
         *
         * clean up view
         *
         */
        remove: function () {

            // don't forget to call the original remove() function
            Backbone.View.prototype.remove.call(this);
        },

        onShow: function () {

            /* var models = ExtendView.prototype.findNext(this.model.get('next'));

            // store this array of nextModels
            this.nextModels = models;

            // this is called last so start preload here
            ExtendView.prototype.preloadNext(models);*/

            NProgress.done();

        },

        /**
         *
         * called after added to DOM and transition has ended
         *
         */
        afterShow: function () {
            // this.video.play();
        },

        render: function () {

            var template = _.template(tmpl);

            this.$el.html(template());

            return ExtendView.prototype.render.apply(this, arguments);

        }

    });

    return WeekView;

});
