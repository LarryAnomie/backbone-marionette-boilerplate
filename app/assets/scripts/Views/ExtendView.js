/* global define, Modernizr */

define([
    'jquery',
    'lodash',
    'backbone',
    'marionette',
    '../config/common',
    'velocity',
    'velocityUi'
], function($, _, Backbone, Marionette, common, velocity) {

    'use strict';

    /**
     * Marionette ItemView extension, all views of type page extend this view
     */
    var ExtendView = Marionette.ItemView.extend({

        classes: {
            page: 'page',
            animatingIn: 'page--is-entering',
            animatingOut: 'page--is-exiting',
            visible: 'page--is-visible'
        },

        duration: 500,

        getTitle: function() {
            return this.model.attributes.title;
        },

        onShow: function() {
            // no op
        },

        afterShow: function() {
            // no op
        },

        render: function(options) {

            console.log('extend render');

            options = options || {};

            if (options.page === true) {
                this.$el.addClass(this.classes.page);
            }

            if (_.isFunction(this.onShow)) {
                this.onShow();
            }

            return this;

        },

        /**
         * css transition in
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        transitionIn: function(callback) {

            var view = this;

            var transitionIn = function() {
                view.$el.addClass(view.classes.animatingIn);

                view.$el.one(common.transitionend, function() {

                    view.trigger('animateIn');

                    if (_.isFunction(callback)) {
                        callback();
                    }
                });
            };

            _.delay(transitionIn, 20);

        },

        /**
         * css transition out
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        transitionOut: function(callback) {

            var view = this;

            view.$el.removeClass(view.classes.animatingOut);

            view.$el.one(common.transitionend, function() {
                view.trigger('animateOut');

                if (_.isFunction(callback)) {
                    callback();
                }
            });

        },

        /**
         * js animate in
         * @param  {Function} callback   [description]
         * @param  {[type]}   transition [description]
         * @return {[type]}              [description]
         */
        animateIn: function(callback, transition) {

            var view = this,
                delay,
                animateIn = function() {

                    view.$el.velocity({
                        translateZ: 0, // Force HA by animating a 3D property
                        translateX: '-100%',
                    }, {
                        duration: view.duration,
                        easing: 'linear',
                        complete: function() {
                            view.trigger('animateIn');

                            view.$el.removeClass(view.classes.animatingIn);

                            if (_.isFunction(callback)) {
                                callback();
                            }
                        }
                    });

                };

            view.$el.addClass(view.classes.animatingIn);

            // call animateIn after a short delay to allow for animating DOM element
            _.delay(animateIn, 20);

        },

        /**
         * js animate out
         * @param  {Function} callback   [description]
         * @param  {[type]}   transition [description]
         * @return {[type]}              [description]
         */
        animateOut: function(callback, transition) {

            console.log('animateOut called');

            var view = this;

            view.$el
                .addClass(view.classes.animatingOut)
                .velocity({
                    translateZ: 0, // Force HA by animating a 3D property
                    translateX: '200%',
                }, {
                    delay : 20,
                    duration: view.duration,
                    easing: 'linear',
                    complete: function() {

                        view.$el.removeClass(view.classes.animatingOut);
                        view.trigger('animateOut');

                        if (_.isFunction(callback)) {
                            callback();
                        }
                    }
                });

        }


    });


    return ExtendView;

});
