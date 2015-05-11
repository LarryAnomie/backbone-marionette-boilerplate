/* global define, Modernizr */

define([
    '../config/common',
    'backbone',
    'marionette',
    'transitionRegion',
    'nprogress',
], function(common, Backbone, Marionette, TransitionRegion, NProgress) {

    'use strict';

    var MainRegion = Marionette.TransitionRegion.extend({

        initialize: function(options) {

            //console.log(options);

        },

        updateDocTitle : function(view) {

            var newTitle = view.getTitle();

            document.title = common.baseTitle + ' | ' + newTitle;

        },

        onBeforeShow: function(view, region, options) {
            console.log('region before show');
            //console.log(view, region, options);
        },

        onShow: function(view, region, options) {
            console.log('region on show');
            //console.log(view, region, options);

            NProgress.done();
            this.updateDocTitle(view);
        },

          // ...

        onBeforeSwap: function(view, region, options) {
            // the `view` has not been swapped yet
            console.log('onbefore swap : the view has not been swapped yet');
            NProgress.start();
        },

        onSwap: function(view, region, options){
            console.log('onSwap');
            // the `view` has been swapped
        },

        onBeforeSwapOut: function(view, region, options) {
            console.log('onBeforeSwapOut');
            // the `view` has not been swapped out yet
        },

        onSwapOut: function(view, region, options){
            // the `view` has been swapped out
            console.log('onSwapOut');
        }

    });

    return MainRegion;

});
