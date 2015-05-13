/* global require */

'use strict';

require.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        lodash: '../bower_components/lodash/dist/lodash',
        underscore: '../bower_components/underscore/underscore',
        modernizr: '../bower_components/modernizr/modernizr',
        backbone: '../bower_components/backbone/backbone',
        marionette: '../bower_components/marionette/lib/backbone.marionette',
        validation: '../bower_components/backbone-validation/src/backbone-validation-amd',
        nprogress: '../bower_components/nprogress/nprogress',
        velocity: '../bower_components/velocity/velocity',
        velocityUi: '../bower_components/velocity/velocity.ui',
        swiper: '../bower_components/swiper/dist/js/swiper',
        transitionRegion : 'Regions/Marionette.TransitionRegion',
        SVGInjector : '../bower_components/svg-injector/svg-injector',
        parallaxify : '../bower_components/jquery.parallaxify/jquery.parallaxify',
        ScrollMagic : '../bower_components/ScrollMagic/scrollmagic/uncompressed/ScrollMagic',
        TweenMax: '../bower_components/greensock/src/uncompressed/TweenMax'
    },
    shim: {
        'modernizr': {
            exports: 'Modernizr'
        },
        'backbone': {
            deps: ['lodash', 'jquery'],
            exports: 'Backbone'
        },
        'marionette' : {
            deps : ['lodash', 'backbone', 'jquery']
        },
        'parallaxify' : {
            deps : ['jquery']
        },
        'TweenMax': {
            exports: 'TweenMax'
        }
    },
    map: {
        '*': {
            'underscore': 'lodash'
        }
    }
});
