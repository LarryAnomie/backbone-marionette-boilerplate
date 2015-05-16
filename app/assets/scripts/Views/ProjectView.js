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
    var tmpl = require('../../bower_components/requirejs-text/text!../../templates/project.html');
    var ProjectModel = require('../Models/ProjectModel');

    // greensock
    var TweenMax = require('TweenMax');
    var TimelineMax = require('TimelineMax');
    var ScrollToPlugin = require('ScrollToPlugin');
    var animationGsap= require('animationGsap');
    var EasePack = require('EasePack');

    // other
    var SVGInjector= require('SVGInjector');

    // begin
    var ProjectView = Marionette.ItemView.extend({

        model: ProjectModel,

        tagName: 'li',

        className: 'project',

        initialize: function(options) {

            console.log('itemView init');

            this.model.set('childViewIndex', options.childIndex + 1);

        },

        template: function(serializedModel) {
            var url = serializedModel.url,
                title = serializedModel.title,
                index = serializedModel.childViewIndex,
                id = serializedModel.id,
                template;

            template = _.template(tmpl, {
                url: url,
                title: title,
                index : index,
                id : id
            }, {variable: 'data'});

            return template;
        },

        modelEvents: {
            'change': function() {
                this.render();
            }
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
        }

    });

    return ProjectView;

});
