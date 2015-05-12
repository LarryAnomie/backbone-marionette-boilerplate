/* global define, Modernizr */

define([
    'jquery',
    'lodash',
    'backbone',
    'marionette',
    'Views/ExtendView',
    '../config/common',
    '../../bower_components/requirejs-text/text!../../templates/page.html'
], function($, _, Backbone, Marionette, ExtendView, common, tmpl) {

    'use strict';

    var PageView = ExtendView.extend({

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

        onShow: function() {
            // react to when a view has been shown

        },

        onAttach: function() {
            console.log(this, 'onAttach');
        },

        onBeforeAttach: function() {
            console.log(this, 'on before attach');
        },

/*s*/

        getTitle: function() {
            return this.model.attributes.title;
        },


        afterShow: function() {
            // no op
        }

    });

    return PageView;

});
