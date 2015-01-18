/* global require */

'use strict';

require(['require-config'], function() {
    require(['app'], function (App) {

        var APP = new App();

        window.APP = APP;

    });

});

