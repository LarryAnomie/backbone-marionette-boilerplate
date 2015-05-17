/* global define, Modernizr */

define([
    'app',
    'backbone',
    'marionette',
    '../Views/HomeView',
    '../Views/PageView',
    '../Views/ProjectPageView',
    '../Collections/ProjectCollection'
], function(app, Backbone, Marionette, HomeView, PageView, ProjectsPageView, ProjectCollection) {
    'use strict';

    var isFirstView = true; // flag to keep track of whether this is a server route or client side

    var AppController = Backbone.Marionette.Controller.extend({

        initialize: function(options) {

        },

        projects : function(pageName) {

            console.log('controller --> projects route', pageName);

            var projectModel, pageModel, projectName, data = [];

            if (!pageName) {
                 pageName = 'projects';
            }

            console.log(pageName);

            if (!app.projects) {
                console.log('controller ---> no project collection, so create it');

/*                if (window.PROJECTS) {
                    data = window.PROJECTS;
                }*/

                app.projects = new ProjectCollection();
                app.projects.fetch({
                    success: function() {
                        console.log('fetch done');
                    }
                });

            }

            // clear currently active model
            app.pages.findWhere({active: true}).set('active', false);

            pageModel = app.pages.findWhere({
                name: 'projects'
            });

            // set new model as active
            pageModel.set('active', true);

            if (isFirstView) {
                isFirstView = false;
                // view already exisits in the DOM, rendered by server
                app.rootView.mainRegion.attachView(new ProjectsPageView({
                            model: pageModel,
                            collection: app.projects,
                            page: true,
                            el : '#page-' + pageName
                }));

            } else {
                app.rootView.mainRegion.show(new ProjectsPageView({
                    model: pageModel,
                    collection : app.projects,
                    page: true,
                    id : 'page-' + pageModel.attributes.name
                }));
            }

        },

        home : function(pageName) {
            var pageModel, pageName;

            console.log('home route --> ', pageName);

            pageName = 'home';

            // clear currently active model
            app.pages.findWhere({active: true}).set('active', false);

            pageModel = app.pages.findWhere({
                name: pageName
            });

            // set new model as active
            pageModel.set('active', true);

            if (isFirstView) {
                isFirstView = false;
                // view already exisits in the DOM, rendered by server
                 app.rootView.mainRegion.attachView(new HomeView({
                    model: pageModel,
                    page: true,
                    el : '#page-' + pageName
                }));

            } else {
                app.rootView.mainRegion.show(new HomeView({
                    model: pageModel,
                    page: true,
                    id : 'page-' + pageModel.attributes.name
                }));
            }
        },

        genericPage : function (pageName) {

            var pageModel;

            console.log('genericPage route --> ', pageName)

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
                // view already exisits in the DOM, rendered by server
                 app.rootView.mainRegion.attachView(new PageView({
                    model: pageModel,
                    page: true,
                    el : '#page-' + pageName
                }));

            } else {
                app.rootView.mainRegion.show(new PageView({
                    model: pageModel,
                    page: true,
                    id : 'page-' + pageModel.attributes.name
                }));
            }

        }
    });

    return AppController;
});
