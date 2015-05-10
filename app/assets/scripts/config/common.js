/* global define, Modernizr */

define(function() {

    'use strict';

    function transitionEndEventName() {
        var i,
            undefined,
            el = document.createElement('div'),
            transitions = {
                'transition': 'transitionend',
                'OTransition': 'otransitionend', // oTransitionEnd in very old Opera
                'MozTransition': 'transitionend',
                'WebkitTransition': 'webkitTransitionEnd'
            };

        for (i in transitions) {
            if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
                return transitions[i];
            }
        }

        //TODO: throw 'TransitionEnd event is not supported in this browser';
    }

    return {
        baseTitle: 'Backbone Marionette Transitions',
        root: '',
        transitionend : transitionEndEventName()
    };
});
