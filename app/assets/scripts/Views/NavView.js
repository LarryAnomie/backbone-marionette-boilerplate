/*global define */

define([
    'marionette',
    'views/NavItemView'
], function (Marionette, NavItemView) {

    'use strict';

    var NavView = Marionette.CollectionView.extend({

        childView: NavItemView,

        tagName: 'ul',

        className: 'app-nav__menu',

        initialize : function(options) {
            this.vent = options.vent;
        }
    });

    return NavView;

});
