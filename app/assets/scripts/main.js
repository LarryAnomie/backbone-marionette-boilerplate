/* global require */

'use strict';

require(['require-config'], function() {

    require([
            'app',
            'Controllers/AppController',
            'Routers/AppRouter',
            'config/common'
            ], function (app, AppController, AppRouter, common) {

                app.appRouter = new AppRouter({
                    vent: app.vent,
                    controller: new AppController()
                });

                $(function() {

                    // All navigation that is relative should be passed through the navigate
                    // method, to be processed by the router. If the link has a `data-bypass`
                    // attribute, bypass the delegation completely.
                    common.$document.on('click', 'a[href]:not([data-bypass])', function(e) {
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
                            e.preventDefault();

                            // Note by using Backbone.history.navigate, router events will not be
                            // triggered.  If this is a problem, change this to navigate on your
                            // router.
                            //Backbone.history.navigate(href.attr, true);
                            app.appRouter.navigate(href.attr, true);
                        }
                    });

                    // Start Marionette Application on DOM ready
                    app.start();
                });

                // expose app
                window.app = app;

            });
});

