/* global define, Modernizr */

define([
    '../config/common',
    'backbone',
    'marionette',
    'transitionRegion',
    'nprogress',
], function(common, Backbone, Marionette, TransitionRegion, NProgress) {

    'use strict';

    console.log(common);

    var MainRegion = Marionette.TransitionRegion.extend({

        initialize: function(options) {

            //console.log(options);

        },

        updateDocTitle : function(view) {

            var newTitle = view.getTitle();

            console.log(view);

            document.title = common.baseTitle + ' | ' + newTitle;

        },

        onBeforeShow: function(view, region, options) {
            console.log('the view has not been shown yet');
            //console.log(view, region, options);
        },

        onShow: function(view, region, options) {
            console.log('the view has been shown');
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
