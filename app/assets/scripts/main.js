/* global require */

'use strict';

require(['require-config'], function() {

    require(['app',
            'Controllers/AppController',
            'Routers/AppRouter'
            ], function (app, AppController, AppRouter) {

                app.appRouter = new AppRouter({
                    controller: new AppController()
                });

                // Start Marionette Application on DOM ready
                $(function() {
                    app.start();
                });

                // expose app
                window.app = app;

            });


});

