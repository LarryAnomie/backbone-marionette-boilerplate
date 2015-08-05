/* global define, Modernizr, Linear, Power4, Elastic */

define(function(require) {

    'use strict';

    // dependencies, using commonjs style for clarity

    var $ = require('jquery');
    var Backbone = require('backbone');
    var Marionette = require('marionette');
    var _ = require('lodash');

    // bespoke
    var common = require('config/common');
    var tmpl = require('../../bower_components/requirejs-text/text!../../templates/projects.html');
    var ProjectView = require('../Views/ProjectView');

    // greensock
    var TweenMax = require('TweenMax');
    var TimelineMax = require('TimelineMax');
    var ScrollToPlugin = require('ScrollToPlugin');
    var animationGsap= require('animationGsap');
    var EasePack = require('EasePack');

    // other
    var SVGInjector= require('SVGInjector');

    // begin
    var ProjectsView = Marionette.CompositeView.extend({

        childView: ProjectView,

        className : 'projects',

        template : tmpl,

        childViewContainer: '.js-projects',

        initialize: function(options) {

            this.getTitle = function() {
                return 'Projects';
            };

            // css classes
            this.classes = {
                page: 'page',
                animatingIn: 'page--is-entering',
                animatingOut: 'page--is-exiting',
                visible: 'page--is-visible'
            },


            this.transitionType = 'js';

        },

        childViewOptions : function(model, index) {

            return {
                childIndex : index
            };

        },

        /**
         *
         * kills this view, unbind any events and destroy stuff here
         *
         */
        remove: function() {
            this.undelegateEvents();
            // don't forget to call the original remove() function
            Backbone.View.prototype.remove.call(this);
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

            TweenMax.fromTo(self.$el, self.inDuration,
                {
                    xPercent: '100%'
                },
                {
                    xPercent: '0%',
                    delay: 0.5,
                    ease: Power4.easeOut,

                    onStart : function () {
                        //debugger;
                    },
                    onComplete: function() {
                        console.log('view ---> animate in finished, triggered animateIn event');
                        self.trigger('animateIn');

                        self.$el.removeClass(self.classes.animatingIn);
                        self.$el.addClass(self.classes.visible);

                    }
                }
            );

        },


        /**
         * animates out the view then trigger animateOut event
         */
        _performAnimateOut : function() {
            var self = this;

            TweenMax.to(self.$el, self.outDuration, {
                    xPercent: '-100%', // animate out right
                    z: 0.01,
                    startAt : {
                        xPercent : '0%'
                    },
                    //ease: Linear.easeNone,
                    ease: Power4.easeIn,
                    onStart : function () {

                    },
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

        }

    });

    return ProjectsView;

});
