/* global define, Modernizr */

define([
    'app',
    'backbone',
    'marionette',
    '../Views/HomeView',
    '../Views/PageView'
], function(app, Backbone, Marionette, HomeView, PageView) {
    'use strict';

    var AppController = Backbone.Marionette.Controller.extend({

        initialize: function(options) {
            // App.headerRegion.show(new NavView());
        },

        showPage: function(pageName) {

            var pageModel;

            if (pageName === null) {
                pageName = 'home';
            }

            pageModel = app.pages.findWhere({
                name: pageName
            });

            app.vent.trigger('menu:activate', pageModel);

            if (pageName === 'home') {

                app.mainRegion.show(new HomeView({
                    model: pageModel,
                    page: true
                }));

            } else {

                app.mainRegion.show(new PageView({
                    model: pageModel,
                    page: true
                }));
            }
        }
    });

    return AppController;
});