/*global define */

define([
    'marionette',
    '../models/PageModel',
    '../views/PageView',
    '../../bower_components/requirejs-text/text!../../templates/NavItemView.html',
], function(Marionette, Page, PageView, tmpl) {
    'use strict';

    var NavItemView = Marionette.ItemView.extend({

        tagName: 'li',

        className: 'app-nav__menu-item',

        model: Page,

        ui: {
            link: 'a'
        },

        events: {
            'click a': 'activateMenu'
        },

        template: function(serializedModel) {
            var url = serializedModel.url,
                title = serializedModel.title,
                template;

            template = _.template(tmpl, {
                url: url,
                title: title
            }, {variable: 'data'});

            return template;
        },

        initialize: function() {
            this.activeClass = 'app-nav__menu-item--active';
        },

        modelEvents: {
            'change:active': function() {

                console.log('change active');
                this.render();
            }
        },

        activateMenu: function(event) {
            /*            window.app.vent.trigger('menu:activate', this.model);
            window.app.main.show(new PageView({model: this.model}));*/
        },

        onRender: function() {
            console.log('onRender');

            if (this.model.get('active')) {
                this.$el.addClass(this.activeClass);
            } else {
                // not sure why this is needed
                this.$el.removeClass(this.activeClass);
            }
        }

    });

    return NavItemView;
});
