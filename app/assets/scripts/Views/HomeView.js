/* global define, Modernizr */

define([
    'jquery',
    'lodash',
    'backbone',
    'marionette',
    'Views/ExtendView',
    '../../bower_components/requirejs-text/text!../../templates/page.html'
], function ($, _, Backbone, marionette, ExtendView, tmpl) {

    'use strict';

    var HomeView = ExtendView.extend({

        id: 'home-page',

        className : 'page--home',

        initialize: function (options) {

            if (options.page) {
                this.$el.addClass('page');
            }

            this.getTitle = function() {
                return this.model.attributes.title;
            }

            this.transitionType = 'css';

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

            return ExtendView.prototype.render.apply(this, arguments);

        }



    });

    return HomeView;

});
