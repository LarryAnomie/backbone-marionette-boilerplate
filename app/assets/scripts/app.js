/* global define, Modernizr */
define([
    'jquery',
    'lodash',
    'modernizr',
    'Views/AppView'
], function($, _, Modernizr, AppView) {

    'use strict';

    var App = function($el) {

        if ( !(this instanceof App) ) {
            return new Apps( $el );
        }

        _.extend(App.prototype, Backbone.Events);

        this.$el = $el;
        this.window = window;
        this.$window = $(window);

        this.instance = {};

        this.init();

    };


    App.prototype.init = function () {

        var self = this;

        self.instance.appView = new AppView(this.$el);

        Backbone.history.start({
            pushState: true
        });

        $(document).on('click', 'a:not([data-bypass])', function(evt) {
            var href = $(this).attr('href'),
                protocol = this.protocol + '//';

            if (href.slice(protocol.length) !== protocol) {
                evt.preventDefault();
                self.instance.appView.router.navigate(href, true);
            }
        });

    };

    return App;
});
