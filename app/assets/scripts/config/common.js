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

    var getY = function() {
        var y = this.supportPageOffset ? window.pageYOffset : this.isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
        return y;
    };

    // cross browser transition name
    var transEndEventName = transEndEventNames[window.Modernizr.prefixed('transition')];


    // Returns a function which adds a vendor prefix to any CSS property name
    var vendorPrefix = (function() {
        var prefixes = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,
            style = $('script')[0].style,
            prefix = '',
            prop;

        for (prop in style) {
            if (prefixes.test(prop)) {
                prefix = prop.match(prefixes)[0];
                break;
            }
        }

        if ('WebkitOpacity' in style) { prefix = 'Webkit'; }
        if ('KhtmlOpacity' in style) { prefix = 'Khtml'; }

        return function(property) {
            return prefix + (prefix.length > 0 ? property.charAt(0).toUpperCase() + property.slice(1) : property);
        };
    }());

    var prefixedTransform = vendorPrefix('transform');

    var environment = 'dev';

    return {
        baseTitle: 'App',
        environemtn : environment,
        root: '',
        transitionend : transEndEventName,
        prefixedTransform : prefixedTransform,
        isMobile : isMobile(),
        $window : $(window),
        $document : $(document),
        getY : getY,
        dom : {
            $body : $('body')
        }
    };
});
