/*global define */

define([
    'jquery',
    'lodash',
    'marionette',
    '../models/PageModel',
    '../views/PageView',
    '../../bower_components/requirejs-text/text!../../templates/NavItemView.html',
], function($, _, Marionette, Page, PageView, tmpl) {
    'use strict';

    var NavItemView = Marionette.ItemView.extend({

        tagName: 'li',

        className: 'app-nav__menu-item',

        model: Page,

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

                console.log(this.model.get('name'), ' navItemViews model active attribute changed');
                this.render();
            }
        },

        onRender: function() {
            console.log(this.model.get('name'), ' navItemView onRender');
            console.log(this.model.get('active'), this.$el);

            if (this.model.get('active')) {
                this.$el.addClass(this.activeClass);
            } else {
                // think this is needed because ItemView render doesn't destroy view?
                this.$el.removeClass(this.activeClass);
            }
        }

    });

    return NavItemView;
});
