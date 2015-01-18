/* global console */
/* jshint maxparams: 15*/

define([
    'jquery',
    'lodash',
    'backbone',
    'views/ExtendView',
    'router'
], function ($, _, Backbone, ExtendView, Router) {

    'use strict';

    /**
     *
     * Our master app view, has a method to control current and previous pages
     *
     */
    var AppView = ExtendView.extend({

        el: '#app',

        initialize: function () {
            this.router = new Router({
                appView : this
            });
        },

        goto: function (view) {

            var previous = this.currentPage || null,
                next = view;

            if (previous) {
                previous.transitionOut(function () {
                    //console.log('app view kill', previous);
                    previous.remove();
                });
            }

            next.render({
                page: true
            });

            this.$el.append(next.$el);

            //this.$el.attr('data-view', view.model.get('type') + '-view');

            next.transitionIn(function () {
                if (_.isFunction(next.afterShow)) {
                    next.afterShow();
                }
            });

            this.currentPage = next;

        },

    });

    return AppView;

});
