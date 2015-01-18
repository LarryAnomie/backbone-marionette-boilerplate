/* global require */

'use strict';

require.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        lodash: '../bower_components/lodash/dist/lodash',
        underscore: '../bower_components/underscore/underscore',
        modernizr: '../bower_components/modernizr/modernizr',
        backbone: '../bower_components/backbone/backbone',
        validation: '../bower_components/backbone-validation/src/backbone-validation-amd',
        nprogress: '../bower_components/nprogress/nprogress'
    },
    shim: {
        'modernizr': {
            exports: 'Modernizr'
        },
        'backbone': {
            deps: ['lodash', 'jquery'],
            exports: 'Backbone'
        }
    }
});
