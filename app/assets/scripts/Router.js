/* global console, MYEE */

/* jshint maxparams: 8 */
define([
    'jquery',
    'lodash',
    'backbone',
    'Views/HomeView',
    'Views/SprintView',
    'Views/WeekView'
], function ($, _, Backbone, HomeView, SprintView, WeekView) {

    'use strict';

    console.log(SprintView);

    var Router = Backbone.Router.extend({

        routes: {
            '': 'index',
            'sprint': 'sprint',
            'search/:sprint/p:week' : 'sprint',
        },

        initialize : function(options) {

            console.log(options);

            this.appView = options.appView;
        },

        index: function () {

            var view;

            console.log(this);

            view = new HomeView();

            this.appView.goto(view);

        },

        sprint: function () {

            var view;

            view = new SprintView();

            this.appView.goto(view);

        },

        week: function (sprint, week) {

            var view;

            view = new WeekView();

            this.appView.goto(view);

        }

    });

    return Router;

});
