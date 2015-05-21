/* global define, Modernizr */

define([
    'jquery',
    'lodash',
    'backbone',
    'marionette',
    'SVGInjector'
], function ($, _, Backbone, Marionette, SVGInjector) {

    'use strict';

    var FooterView = Backbone.Marionette.View.extend({

        initialize: function (options) {

            this.injectSVG();

        },

        injectSVG : function() {
            // Elements to inject
            var mySVGsToInject = document.querySelectorAll('.icon-svg');

            // Do the injection

            /* jshint ignore:start */
            SVGInjector(mySVGsToInject);
            /* jshint ignore:end */

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
        /**
         * called after view is added to DOM
         */
        onShow: function(view, region, options) {
            // react to when a view has been shown
            console.log('footer shown');

            this.injectSVG();
        },

        onBeforeShow: function(view, region, options) {
            console.log('footerView onBeforeShow', view, region, options);
        }


    });

    return FooterView;

});
