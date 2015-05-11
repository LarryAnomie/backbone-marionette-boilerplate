/* global define, Modernizr */

define([
    'app',
    'backbone',
    'marionette',
    '../Views/HomeView',
    '../Views/PageView'
], function(app, Backbone, Marionette, HomeView, PageView) {
    'use strict';

    var isFirstView = true;

    var AppController = Backbone.Marionette.Controller.extend({

        initialize: function(options) {

        },

        showPage: function(pageName) {

            var pageModel;

            if (pageName === null) {
                pageName = 'home';
            } else {
                pageName = pageName.replace('.html', '');
            }

            // clear currently active model
            app.pages.findWhere({active: true}).set('active', false);

            pageModel = app.pages.findWhere({
                name: pageName
            });

            // set new model as active
            pageModel.set('active', true);

            if (isFirstView) {
                isFirstView = false;

                 app.mainRegion.attachView(new PageView({
                    model: pageModel,
                    page: true
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
