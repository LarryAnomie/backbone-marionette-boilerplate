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
            console.log('region --> before show');
            //console.log(view, region, options);
        },

        onShow: function(view, region, options) {
            console.log('region --> on show');
            //console.log(view, region, options);


            this.updateDocTitle(view);
        },

        onAnimateIn : function(view) {
            console.log('region --> onAnimateIn', view);
            NProgress.done();
        },



        onBeforeSwap: function(view, region, options) {
            // the `view` has not been swapped yet
            console.log('region --> onbefore swap : the view has not been swapped yet');
            NProgress.start();
        },

        onSwap: function(view, region, options){
            console.log('region --> onSwap');
            // the `view` has been swapped
        },

        onBeforeSwapOut: function(view, region, options) {
            console.log('region --> onBeforeSwapOut');
            // the `view` has not been swapped out yet
        },

        onSwapOut: function(view, region, options){
            // the `view` has been swapped out
            console.log('region --> onSwapOut');
        }

    });

    return MainRegion;

});
