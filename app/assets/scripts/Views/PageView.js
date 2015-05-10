/* global define, Modernizr */

define([
    'jquery',
    'lodash',
    'backbone',
    'marionette',
    'Views/ExtendView',
    '../../bower_components/requirejs-text/text!../../templates/page.html',
], function ($, _, Backbone, marionette, ExtendView, tmpl) {

    'use strict';

    var PageView = ExtendView.extend({

        className : '',

        initialize: function (options) {

            if (options.page) {
                this.$el.addClass('page page--' + this.model.attributes.name);
            }

            this.getTitle = function() {
                return this.model.attributes.title;
            };

            this.transitionType = 'js';

        },

        /**
         *
         * clean up view.
         *
         */
/*        remove: function () {

            console.log('home view remove fn')

            // don't forget to call the original remove() function
            Backbone.View.prototype.remove.call(this);
        },
*/
        render: function () {

            var template = _.template(tmpl, this.model.attributes, {variable: 'data'});

            this.$el.html(template);

        }



    });

    return PageView;

});
