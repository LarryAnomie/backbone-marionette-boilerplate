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

        project : function(id, param) {

            console.log('router -->', id, param);

            var projectModel, pageModel, projectName, data = [];

            if (app.projects) {

                if (id) {
                    pageModel = app.pages.findWhere({
                        name: id
                    });
                }
            } else {
                console.log('no project collection, so create it');

                if (window.PROJECTS) {
                    data = window.PROJECTS;
                }

                app.projects = new ProjectCollection(data);

                if (!window.PROJECTS) {
                    app.projects.fetch();
                }
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

        home : function() {
            var pageModel, pageName;

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

        /**
         * generic page controller
         * @param  {String} pageName
         */
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
