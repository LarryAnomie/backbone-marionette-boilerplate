/* global define, Modernizr */

define([
    'jquery',
],function($) {

    'use strict';

    var transEndEventNames = {
        'WebkitTransition': 'webkitTransitionEnd', // Saf 6, Android Browser
        'MozTransition': 'transitionend', // only for FF < 15
        'transition': 'transitionend' // IE10, Opera, Chrome, FF 15+, Saf 7+
    };

    var isMobile = function() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        return ((/iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/).test(userAgent));
    };

    // cross browser transition name
    var transEndEventName = transEndEventNames[window.Modernizr.prefixed('transition')];

    return {
        baseTitle: 'Backbone Marionette Transitions',
        root: '',
        transitionend : transEndEventName,
        isMobile : isMobile(),
        $window : $(window),
        $document : $(document),
        dom : {
            $body : $('body')
        }
    };
});
