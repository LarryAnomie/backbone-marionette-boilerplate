/*global define */

define([
    'marionette',
    'views/NavItemView'
], function (Marionette, NavItemView) {
    'use strict';

    var NavView = Marionette.CollectionView.extend({

        itemView: NavItemView,

        tagName: 'ul',

        className: 'nav nav-pills pull-right',

        initialize : function(options) {
            console.log(options);
            this.vent = options.vent;
        }
    });

    return NavView;

});
