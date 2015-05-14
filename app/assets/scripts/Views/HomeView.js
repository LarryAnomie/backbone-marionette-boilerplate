/* global define, Modernizr */

define([
    'jquery',
    'lodash',
    'backbone',
    'marionette',
    'velocity',
    'TweenMax',
    'ScrollMagic',
    'Views/ExtendView',
    '../config/common',
    '../../bower_components/requirejs-text/text!../../templates/page.html',
    'ScrollToPlugin',
    'parallaxify',
    'debug',
    'animationGsap'
], function($, _, Backbone, Marionette, Velocity, TweenMax, ScrollMagic, ExtendView, common, tmpl, ScrollToPlugin) {


    'use strict';

    var HomeView = ExtendView.extend({

        className: '',

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
        _scrollTo: function($el, duration, easing, cb) {

            var animDuration = duration ? duration : 250,
                animEasing = easing ? easing : 'ease-out',
                noop = function() {},
                animCb = _.isFunction(cb) ? cb : noop;

            if (!$el || !$el.length) {
                return;
            }

            $el.velocity('scroll', {
                duration: animDuration,
                easing: animEasing,
                complete: animCb
            });

        },

        _galaxy : function() {

            /**
             * set a reverse positionProperty - mouse goes right, object goes left
             * @type {Object}
             */
            $.parallaxify.positionProperty.flipya = {
                setPosition: function($element, left, originalLeft, top, originalTop) {

                    console.log($element);

                    var newLeft = left - originalLeft,
                        newTop = top - originalTop;

                    newLeft = (newLeft < 0) ? Math.abs(newLeft) : -Math.abs(newLeft);
                    newTop = (newTop < 0) ? Math.abs(newTop) : -Math.abs(newTop);

                    $element[0].style[common.prefixedTransform] = 'translate3d(' + newLeft + 'px, ' + newTop + 'px, 0)';

                }
            };

            this.$world = this.$('.js-world');
            this.$galaxy = this.$('.js-galaxy');

/*            $.parallaxify({
                positionProperty: 'flipya',
                responsive: true,
                motionType: 'natural',
                mouseMotionType: 'gaussian',
                motionAngleX: 80,
                motionAngleY: 80,
                alphaFilter: 0.5,
                adjustBasePosition: true,
                alphaPosition: 0.025
            });*/

/*            this.$world.parallaxify({
                positionProperty: 'flipya',
                responsive: true,
                motionType: 'natural',
                mouseMotionType: 'gaussian',
                motionAngleX: 80,
                motionAngleY: 80,
                alphaFilter: 0.5,
                adjustBasePosition: true,
                alphaPosition: 0.025
            });*/

            this.$galaxy.parallaxify({
                positionProperty: 'flipya',
                responsive: true,
                motionType: 'natural',
                mouseMotionType: 'gaussian',
                motionAngleX: 80,
                motionAngleY: 80,
                alphaFilter: 0.5,
                adjustBasePosition: true,
                alphaPosition: 0.025,
                parallaxElements : true
            });

        },

        // react to when a view has been shown
        onShow: function() {

            this._galaxy();

            // init controller
            this.controller = new ScrollMagic.Controller({
                globalSceneOptions: {
                    triggerHook: 'onEnter',
                    duration: '200%'
                }
            });

            this.scenes = [];

            // build scenes
            this.scenes.push(

                new ScrollMagic.Scene({
                    triggerElement: '#parallax1'
                })
                .setTween('#parallax1 > div', {
                    y: '80%',
                    ease: 'Linear.easeNone'
                })
                .addIndicators()
                .addTo(this.controller)

            );

            this.scenes.push(
                new ScrollMagic.Scene({
                    triggerElement: '#parallax2'
                })
                .setTween('#parallax2 > div', {
                    y: '80%',
                    ease: 'Linear.easeNone'
                })
                .addIndicators()
                .addTo(this.controller)
            );

            this.scenes.push(

                new ScrollMagic.Scene({
                    triggerElement: '#parallax3'
                })
                .setTween('#parallax3 > div', {
                    y: '80%',
                    ease: 'Linear.easeNone'
                })
                .addIndicators()
                .addTo(this.controller)

            );

/*            var slides = document.querySelectorAll('section.panel');

            // create scene for every slide
            for (var i = 0; i < slides.length; i++) {
                new ScrollMagic.Scene({
                    triggerElement: slides[i]
                })
                    .setPin(slides[i])
                    .addIndicators() // add indicators (requires plugin)
                .addTo(this.controller);
            }*/


        },

        onAttach: function() {
            console.log(this, 'onAttach');
        },

        onBeforeAttach: function() {
            console.log(this, 'on before attach');
        },


        // css classes
        classes: {
            page: 'page',
            animatingIn: 'page--is-entering',
            animatingOut: 'page--is-exiting',
            visible: 'page--is-visible'
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

        /**
         *
         * kills this view, unbind any events and destroy stuff here
         *
         */
        remove: function() {

            var i = 0,
                scenes = this.scenes,
                scenesLength = scenes.length;

            this.$world.parallaxify('destroy');
            this.$galaxy.parallaxify('destroy');


            // destroy scrollMagic controller
            this.controller.destroy(true);
            this.controller = null;

            // kill all scences
            for (i; i < scenesLength; i++) {
                scenes[i].destroy(false);
                scenes[i] = null;
            }

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

    return HomeView;

});
