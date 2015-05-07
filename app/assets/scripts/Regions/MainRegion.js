/* global define, Modernizr */

define([
    'app',
    'backbone',
    'marionette',
    'transitionRegion',
    'nprogress',
], function(app, Backbone, Marionette, TransitionRegion, NProgress) {

    'use strict';

    var MainRegion = Marionette.TransitionRegion.extend({

        initialize: function(options) {

            //console.log(options);

        },

        onBeforeShow: function(view, region, options) {
            console.log('the view has not been shown yet');
            //console.log(view, region, options);

            NProgress.start();
        },

        onShow: function(view, region, options) {
            console.log('the view has been shown');
            //console.log(view, region, options);

            NProgress.done();
        },

          // ...

        onBeforeSwap: function(view, region, options) {
            // the `view` has not been swapped yet
            console.log('the view has not been swapped yet');
            NProgress.start();
        },

        onSwap: function(view, region, options){
        // the `view` has been swapped
        },

        onBeforeSwapOut: function(view, region, options) {
        // the `view` has not been swapped out yet
        },

        onSwapOut: function(view, region, options){
        // the `view` has been swapped out
        }

    });

    return MainRegion;

});
