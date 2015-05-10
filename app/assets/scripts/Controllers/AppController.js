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

        },

        showPage: function(pageName) {

            var pageModel;

            if (pageName === null) {
                pageName = 'home';
            }

            // clear currently active model
            console.log(app.pages.findWhere({active:true}));
            app.pages.findWhere({active: true}).set('active', false);

            pageModel = app.pages.findWhere({
                name: pageName
            });

            // set new model as active
            pageModel.set('active', true);

            if (pageName === 'home') {

                app.mainRegion.show(new HomeView({
                    model: pageModel,
                    page: true,
                    id : 'page-' + pageModel.attributes.name
                }));

            } else {

                app.mainRegion.show(new PageView({
                    model: pageModel,
                    page: true,
                    id : 'page-' + pageModel.attributes.name
                }));
            }
        }
    });

    return AppController;
});
