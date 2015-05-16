/* global define, Modernizr */

define(function(require) {

    'use strict';

    // dependencies, using commonjs style for clarity

    var $ = require('jquery');
    var Backbone = require('backbone');
    var Marionette = require('marionette');
    var _ = require('lodash');
    var MainRegion = require('Regions/MainRegion');
    var PageCollection = require('Collections/PageCollection');
    var NavView = require('Views/NavView');
    var data = require('data');
    var common = require('config/common');
    var SVGInjector= require('SVGInjector');
    var FooterView = require('Views/FooterView');
    var StickyHeaderView = require('Views/StickyHeaderView');
    var Tracking = require('config/Tracking');

    var app = new Marionette.Application();

    // set root of app
    app.root = common.root;

    // init page collection
    app.pages = new PageCollection(data);

    // init nav view
    var navView = new NavView({
        collection: app.pages,
        vent: app.vent
    });

    // init footerView
    var footerView = new FooterView({
        el: '.js-footer-view'
    });

    var stickyHeaderView = new StickyHeaderView({
        el : '.js-header'
    });

    var RootView = Marionette.LayoutView.extend({
        el: 'body'
    });

    app.rootView = new RootView();

    // Organize application into regions corresponding to DOM elements

    app.rootView.addRegions({
        headerRegion: '.js-header',
        mainRegion: new MainRegion({
            el: '.js-main'
        }),
        footerRegion: 'js-footer'
    });

    app.addInitializer(function() {

        app.rootView.headerRegion.show(navView);
        app.rootView.footerRegion.attachView(footerView); // footer already exisits in the DOM
        app.rootView.headerRegion.attachView(stickyHeaderView); // footer already exisits in the DOM
        app.tracking = new Tracking({
            vent : app.vent
        });

        Backbone.history.start({
            pushState: true
        });

    });

    return app;

});
