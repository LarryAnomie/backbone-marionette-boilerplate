/* global define, Modernizr */

define([
    'jquery',
    'backbone',
    'marionette',
    'lodash',
    'Regions/MainRegion',
    'Collections/PageCollection',
    'data'
], function($, Backbone, Marionette, _, MainRegion, PageCollection, data) {

    'use strict';

    var app = new Marionette.Application();

    app.root = '';

    function isMobile() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        return ((/iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/).test(userAgent));
    }

    // All navigation that is relative should be passed through the navigate
    // method, to be processed by the router. If the link has a `data-bypass`
    // attribute, bypass the delegation completely.
    $(document).on('click', 'a[href]:not([data-bypass])', function(evt) {
        // Get the absolute anchor href.
        var href = {
            prop: $(this).prop('href'),
            attr: $(this).attr('href')
        };

        // Get the absolute root.
        var root = location.protocol + '//' + location.host + app.root;


        // Ensure the root is part of the anchor href, meaning it's relative.
        if (href.prop.slice(0, root.length) === root) {
            // Stop the default event to ensure the link will not cause a page
            // refresh.
            evt.preventDefault();

            // Note by using Backbone.history.navigate, router events will not be
            // triggered.  If this is a problem, change this to navigate on your
            // router.
            Backbone.history.navigate(href.attr, true);
        }
    });

    console.log(data);

    app.pages = new PageCollection(data);

//var menu = new MenuView({collection: app.pages});

    //Organize application into regions corresponding to DOM elements
    //Regions can contain views, Layouts, or subregions nested as necessary
    app.addRegions({
        headerRegion: '.js-header',
        mainRegion: new MainRegion({
            el: '.js-main'
        }),
        footerRegion: 'js-footer'
    });

    app.addInitializer(function() {
        Backbone.history.start({
            pushState: true
        });
    });

    app.isMobile = isMobile();

    return app;
});
