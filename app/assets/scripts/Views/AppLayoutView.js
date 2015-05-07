/* global define, Modernizr */

define([
    'jquery',
    'lodash',
    'backbone',
    'marionette',
    '../Regions/MainRegion'
], function($, _, Backbone, Marionette, MainRegion) {

    'use strict';

    /**
     *
     * Marionette ItemView extension, all views of type page extend this view
     *
     */
    var AppLayoutView = Marionette.ItemView.extend({

        initialize: function(options) {

        },

        el: '.app',

        regions: {
            headerRegion: '.js-header',
            mainRegion: new MainRegion({
                el: '.js-main'
            }),
            footerRegion: '.js-footer'
        }

    });

    return AppLayoutView;

});
