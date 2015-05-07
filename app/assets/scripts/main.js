/* global require */

'use strict';

require(['require-config'], function() {

    require(['app',
            'Controllers/AppController',
            'Routers/AppRouter'
            ], function (app, AppController, AppRouter) {

                console.log(app);

                app.appRouter = new AppRouter({
                    controller: new AppController()
                });

                // Start Marionette Application in desktop mode (default)
                app.start();

                window.app = app;


            });


});

