/* global define, Modernizr, Linear, Power4, Elastic */

define(function(require) {

    'use strict';

    // dependencies, using commonjs style for clarity

    var $ = require('jquery');
    var Backbone = require('backbone');
    var Marionette = require('marionette');
    var _ = require('lodash');

    // bespoke
    var ExtendView = require('Views/ExtendView');
    var common = require('config/common');
    var tmpl = require('../../bower_components/requirejs-text/text!../../templates/projects.html');
    var ProjectsView = require('Views/ProjectsView');

    // greensock
    var TweenMax = require('TweenMax');
    var TimelineMax = require('TimelineMax');
    var ScrollToPlugin = require('ScrollToPlugin');
    var animationGsap= require('animationGsap');
    var EasePack = require('EasePack');

    // other
    var SVGInjector= require('SVGInjector');

    // begin
    var ProjectPageView = ExtendView.extend({

        className: '',

        template : _.template(tmpl),

        initialize: function(options) {

            if (options.page) {
                this.$el.addClass('page page--' + this.model.attributes.name);
            }

            this.collection = options.collection;

            this.collectionView = new ProjectsView({
                collection : this.collection
            });

            this.getTitle = function() {
                return this.model.attributes.title;
            };

            this.transitionType = 'js';

        },

        // react to when a view has been shown
        onShow: function() {


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
         *
         * kills this view, unbind any events and destroy stuff here
         *
         */
        remove: function() {

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
        onRender: function() {

            this.$('.js-projects').append( this.collectionView.render().el );

            return this.$el;

        }

    });

    return ProjectPageView;

});
