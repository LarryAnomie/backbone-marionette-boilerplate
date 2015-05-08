/*global define */

define([
    'marionette',
    '../models/PageModel',
    '../views/PageView'
], function (Marionette, Page, PageView) {
    'use strict';

    var NavItemView = Marionette.ItemView.extend({

        tagName: 'li',

        model: Page,

        ui: {
            link: 'a'
        },

        events: {
            'click a': 'activateMenu'
        },

        modelEvents: {
            "change:active": function() {
                this.render();
            }
        },

        activateMenu: function (event) {
            window.app.vent.trigger('menu:activate', this.model);
            window.app.main.show(new PageView({model: this.model}));
        },

        onRender: function() {
            if(this.model.get('active')) this.$el.addClass('active');
        }

    });

    return NavItemView;
});
