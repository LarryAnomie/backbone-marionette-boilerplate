/* global define, Modernizr */

define([
    'jquery',
    'lodash',
    'backbone',
    'marionette',
    'velocity',
    'velocityUi'
], function($, _, Backbone, Marionette, velocity) {

    'use strict';

    /**
     * Marionette ItemView extension, all views of type page extend this view
     */
    var ExtendView = Marionette.ItemView.extend({

        classes : {
            page : 'page',
            animatingIn : 'page--is-entering',
            animatingOut : 'page--is-exiting',
            visible : 'page--is-visible'
        },

        duration : 250,

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

        animateIn: function(callback, transition) {

            var view = this,
                delay,

                animateIn = function() {
                    view.$el
                    .addClass(view.classes.animatingIn)
                    .velocity({
                        translateZ: 0, // Force HA by animating a 3D property
                        translateX: '-100%',
                    }, {
                        duration: view.duration,
                        complete: function() {
                            view.trigger('animateIn');

                            view.$el.removeClass(view.classes.animatingIn);

                            if (_.isFunction(callback)) {
                                callback();
                            }
                        }
                    });

                };

            // call animateIn after a short delay to allow for animating DOM element
            _.delay(animateIn, 10);


        },

        animateOut: function(callback, transition) {

            var view = this;

            view.$el
            .addClass(view.classes.animatingOut)
            .velocity('reverse', {
                duration: view.duration,
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
