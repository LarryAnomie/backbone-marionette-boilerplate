/* global define, Modernizr */

define(['backbone', 'marionette'], function(Backbone, Marionette) {

    'use strict';

    var AppRouter = Backbone.Marionette.AppRouter.extend({
        //'index' must be a method in AppRouter's controller
        appRoutes: {
            '' : 'home',
            'pages/:pageName' : 'showPage'
        }
    });

    return AppRouter;
});
