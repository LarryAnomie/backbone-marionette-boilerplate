/* global define, Modernizr */

define(['backbone', 'marionette'], function(Backbone, Marionette) {

    'use strict';

    var AppRouter = Backbone.Marionette.AppRouter.extend({

        currentFragment : null,

        lastFragment : null,

        _setFragment : function(fragment) {

            if (fragment === this.lastFragment) {
                console.log('going back');
            }

            this.lastFragment = this.currentFragment;
            this.currentFragment = fragment;

           console.log('router-->, last fragment = ', this.lastFragment, 'currentFragment = ', this.currentFragment)

        },

        getFragment : function() {
            return this.currentFragment;
        },

        initialize : function(options) {
            var self = this;

            this.vent = options.vent;

            this.on('route', function() {

                var fragment = Backbone.history.getFragment();

                this.vent.trigger('route:change', fragment);

                if (fragment === '') {
                    fragment = 'home';
                }

                this._setFragment( fragment );
            });
        },

        //navigate should be called over direct calls to the Backbone.history object
        navigate: function(route, options) {

            var ops = options || {};

            //call the underlying backbone method
            Backbone.history.navigate(route, ops);
        },

        //'index' must be a method in AppRouter's controller
        appRoutes: {
            '' : 'home',
            'pages/:pageName' : 'showPage',
            'projects' : 'project',
            'projects/:project' : 'project'
        }
    });

    return AppRouter;
});
