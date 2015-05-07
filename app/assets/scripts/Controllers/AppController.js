/* global define, Modernizr */

define([
    'app',
    'backbone',
    'marionette',
    '../Views/HomeView',
    '../Views/SprintView',
    '../Views/PageView'
], function(app, Backbone, Marionette, HomeView, SprintView, PageView) {
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

            console.log(pageName);

            console.log('Router => Showing page: ' + pageName);

            pageModel = app.pages.findWhere({
                name: pageName
            });

            app.vent.trigger('menu:activate', pageModel);

            if (pageName === 'home') {
                app.mainRegion.show(new HomeView({
                    model: pageModel
                }));
            } else {
                app.mainRegion.show(new PageView({
                    model: pageModel,
                    page: true
                }));
            }
        },

        //gets mapped to in AppRouter's appRoutes
        index: function() {
            app.mainRegion.show(
                new HomeView({
                    page: true
                })
            );
        },

        page2: function() {
            app.mainRegion.show(
                new SprintView({
                    page: true
                })
            );
        },

        page3: function() {
            app.mainRegion.show(
                new PageView({
                    page: true
                })
            );
        }
    });

    return AppController;
});
