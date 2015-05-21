/* global define, Modernizr, ga */

define([
    'jquery',
    'lodash',
    'backbone',
    'marionette',
    'config/common'
],function($, _, Backbone, Marionette, common) {

    'use strict';

    var Tracking = Marionette.Object.extend({

        initialize : function(options) {

            this.vent = options.vent;

            _.bindAll(this, '_trackPageView');

            // listen to route change event from router
            this.vent.bind( 'route:change', this._trackPageView );

        },

        /**
         * tracks a page view with google analytics
         * @param  {String} gaFragment - an app route
         */
        _trackPageView : function(gaFragment) {

            // Analytics.js
            var ga;

            // legacy version
            if (typeof window._gaq !== 'undefined') {
                window._gaq.push(['_trackPageview', gaFragment]);
            }

            if (window.GoogleAnalyticsObject && window.GoogleAnalyticsObject !== 'ga') {
                ga = window.GoogleAnalyticsObject;
            } else {
                ga = window.ga;
            }

            if (typeof ga !== 'undefined') {
                ga('send', 'pageview', gaFragment);
            }

        },

        /**
         * Wrapper to send Events to Google Analytics
         * @param {string} action   Action we are logging. lower-case
         * @param {string} category standardized event categories
         * @param {string} label    optional description
         */
        logUiEvent: function(action, category, label) {
            var lb = label || '';

            //check for google analytics
            if (window.ga) {
                //send the information
                ga('send','event', category, action, lb );
            }

            // if in development, log it out
            if (common.environment === 'dev') {
                console.log('GA: event: ' + category + '::' + action + ' l: ' + lb);
            }
        }

    });

    return Tracking;
});
