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
    var ProjectsView = Marionette.CollectionView.extend({

        childView: ProjectView,

        className : 'projects',

        tagName : 'ul',

        initialize: function(options) {

            this.getTitle = function() {
                return 'Projects';
            };

            this.transitionType = 'js';

        },

        childViewOptions : function(model, index) {

            return {
                childIndex : index
            };

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

        afterShow: function() {
            // no op
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

        onRender: function() {

/*            var template = _.template(tmpl, this.model.attributes, {
                variable: 'data'
            });

            this.$el.html(template);*/

            return this.$el;

        }

    });

    return ProjectsView;

});
