/* global console, APP*/
define([
    'jquery',
    'lodash',
    'backbone'
], function ($, _, Backbone) {

    'use strict';

    /**
     *
     * Backbone View extension, all views of type page extend this view
     *
     */
    var ExtendView = Backbone.View.extend({

        initialize: function () {

        },

        onShow: function () {
            // no op
        },

        afterShow: function () {
            // no op
        },

        render: function (options) {

            options = options || {};

            if (options.page === true) {
                this.$el.addClass('page');
            }

            if (_.isFunction(this.onShow)) {
                this.onShow();
            }

            return this;

        },

        transitionIn: function (callback) {

            var view = this,
                delay;

            var transitionIn = function () {

                view.$el.addClass('is-entering is-visible');

                if (typeof APP.transEndEventName === 'undefined') {
                    view.$el.removeClass('is-entering');
                    if (_.isFunction(callback)) {
                        callback();
                    }
                } else {

                    view.$el.on(APP.transEndEventName, function (e) {

                        //console.log('--> transition end event target', e);

                        // event is bubbling up from things like carousels
                        if ($(e.target).hasClass('page')) {

                            view.$el.removeClass('is-entering');

                            if (_.isFunction(callback)) {
                                callback();
                            }
                        }
                    });
                }

            };

            _.delay(transitionIn, 20);

        },

        transitionOut: function (callback) {

            var view = this;

            view.$el.removeClass('is-visible');
            view.$el.addClass('is-exiting');

            if (typeof APP.transEndEventName === 'undefined') {

                view.$el.removeClass('is-entering');

                if (_.isFunction(callback)) {
                    callback();
                }

            } else {

                view.$el.on(APP.transEndEventName, function (e) {
                    //console.log('transition out target  =', e.target);

                    if ($(e.target).hasClass('page')) {

                        //console.log('is page');

                        view.$el.removeClass('is-exiting');

                        if (_.isFunction(callback)) {
                            callback();
                        }
                    }
                });
            }

        }


    });


    return ExtendView;

});
