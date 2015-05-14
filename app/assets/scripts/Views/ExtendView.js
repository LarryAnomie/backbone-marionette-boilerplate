/* global define, Modernizr */

define([
    'jquery',
    'lodash',
    'backbone',
    'marionette',
    'TweenMax',
    'ScrollMagic',
    '../config/common',
    '../../bower_components/requirejs-text/text!../../templates/page.html',
    'ScrollToPlugin',
    'debug'
], function($, _, Backbone, Marionette, TweenMax, ScrollMagic, common, tmpl, ScrollToPlugin) {


    'use strict';

    var ExtendView = Backbone.Marionette.View.extend({

        className: '',


        // css classes
        classes: {
            page: 'page',
            animatingIn: 'page--is-entering',
            animatingOut: 'page--is-exiting',
            visible: 'page--is-visible'
        },

        inDuration: 1, // default animation duration
        outDuration : 1,

        initialize: function(options) {

            if (options.page) {
                this.$el.addClass('page page--' + this.model.attributes.name);
            }

            this.getTitle = function() {
                return this.model.attributes.title;
            };

            this.transitionType = 'js';

        },

        /**
         * scrolls to an element using velocity scroll fn
         *
         * @param {Object} $el jQuery object for element to scroll to
         * @param {Number} duration - duration of animation in milliseconds
         * @param {Strin} easing - easing to use
         * @param {Function} cb - callback fn
         */
        _scrollTo : function($el, duration, easing, cb) {

            var animDuration = duration ? duration : 250,
                animEasing = easing ? easing : 'ease-out',
                noop = function() {},
                animCb = _.isFunction(cb) ? cb : noop;

            if (!$el || !$el.length) {
                return;
            }



/*            $el.velocity('scroll', {
                duration: animDuration,
                easing: animEasing,
                complete: animCb
            });*/

        },

        onShow: function() {


        },

        onAttach: function() {
            console.log(this, 'view ---> onAttach');
        },

        onBeforeAttach: function() {
            console.log(this, 'view ---> on before attach');
        },


        getTitle: function() {
            return this.model.attributes.title;
        },

        afterShow: function() {
            // no op
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

        onAnimateIn : function(view) {
            console.log('view ---> onAnimateIn', view);
        },

        onBeforeEmpty : function() {
            console.log('view ---> onBeforeEmpty');
        },

        /**
         * js animate in
         * @param  {Function} callback   [description]
         * @param  {[type]}   transition [description]
         * @return {[type]}              [description]
         */
        animateIn: function(callback, transition) {

            var self = this;


            self.$el.addClass(self.classes.animatingIn);

            console.log('view --> about to animateIn');

            TweenMax.to(self.$el, self.inDuration, {
                xPercent: '-100%',
                z: 0.01,
                ease: 'Power4.easeIn',
                delay : 0,
                onComplete: function() {
                    console.log('view ---> animate in finished, triggered animateIn event');
                    self.trigger('animateIn');

                    self.$el.removeClass(self.classes.animatingIn);
                    self.$el.addClass(self.classes.visible);

                }
            });

        },


        /**
         * animates out the view then trigger animateOut event
         */
        _performAnimateOut : function() {
            var self = this;

            TweenMax.fromTo(self.$el, self.outDuration,
                {
                    xPercent: '-100%',

                }, {
                    delay : 0,
                    xPercent: '-200%',
                    z: 0.01,
                    ease:'Power4.easeOut',
                    onComplete: function() {

                        console.log('view ---> animating out finished, trigger animateOut event');


                        self.trigger('animateOut');
                        self.$el.removeClass( self.classes.animatingIn );

                    }
                }
            );

        },

        /**
         * js animate out
         * @param  {Function} callback   [description]
         * @param  {[type]}   transition [description]
         * @return {[type]}              [description]
         */
        animateOut: function(callback, transition) {

            console.log('view ---> about to animate out', this.id);

            var self = this;

            self.$el.addClass(self.classes.animatingOut);

            if (common.getY) {

                // scroll to 0 pixels down from the top
                TweenMax.to(window, 0.7, {
                    scrollTo: { y : 0 },
                    ease:'Power2.easeOut',
                    onComplete: function() {
                        self._performAnimateOut();
                    }
                });

            } else {
                this._performAnimateOut();
            }

        },

        /**
         *
         * kills this view, unbind any events here
         *
         */
        remove : function() {

            // don't forget to call the original remove() function
            Backbone.View.prototype.remove.call(this);
        },

        /**
         * this gets called by the region if the View already exisits in the DOM
         * Useful hook for any init work we need that would normally run onShow
         */
        attachView: function() {
            //console.log('view was already in DOM');
            this.onShow();
        },

        /**
         * called by region show method, not called when view already exisits in the dom
         * @return {Object} $el
         */
        render: function() {

            var template = _.template(tmpl, this.model.attributes, {
                variable: 'data'
            });

            this.$el.html(template);

            return this.$el;

        }

    });

    return ExtendView;

});
