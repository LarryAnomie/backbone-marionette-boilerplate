/* global define, Modernizr, requestAnimationFrame */

define([
    'jquery',
    'lodash',
    'backbone',
    'marionette',
], function ($, _, Backbone, Marionette) {

    'use strict';

    var StickyHeaderView = Backbone.Marionette.View.extend({

        initialize: function (options) {

            this.window = window;
            this.$window = $(this.window);

            // css classes
            this.classHidden = 'header--hidden'; // header hidden class
            this.classVisible = 'header--visible'; // header visible class

            // variables
            this.ticking = false;
            this.latestScrollY = 0;
            this.previousY = 0;

            this.supportPageOffset = window.pageXOffset !== undefined;
            this.isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat');

            // constants
            this.HEADER_HEIGHT = this.$el.height(); // gets hidden once scrolled past this point

            // attach scroll event to window
            this.$window.on('scroll', this._onScroll.bind(this));

        },

        /**
         * shows header
         */
        _stick: function () {
            this.$el.removeClass(this.classHidden).addClass(this.classVisible);
        },

        /**
         * hides header
         */
        _unStick :function() {
            this.$el.removeClass(this.classVisible).addClass(this.classHidden);
        },

        /**
         * resets all classes
         */
        _reset : function() {
            this.$el.removeClass(this.classVisible).removeClass(this.classHidden);
        },

        /**
         * figures out whether we need to hide or show the header
         * called inside a requestAnimationFrame
         */
        _update :function() {
            // reset the tick so we can capture the next onScroll
            this.ticking = false;

            if (this.latestScrollY > this.HEADER_HEIGHT) { // scrolled past the header

                if (this.latestScrollY < this.previousY) { // scrolling up

                    this._stick();

                } else { // scrolling down

                    this._unStick();
                }

            } else if (this.latestScrollY <= 0) { // at the top of the page
                this._reset();
            }

            // if user is at the bottom of page show header
            /*            if ((window.innerHeight + this.latestScrollY) >= document.body.offsetHeight) {
                            this.$el.removeClass(this.classHidden);
                        }*/
                        
            this.previousY = this.latestScrollY; // update our Y position record
        },

        /**
         * checks whether an update is currently taking place, if not calls an update
         * via requestAnimationFrame
         */
        _requestTick :function() {
            if (!this.ticking) {
                requestAnimationFrame(this._update.bind(this));
            }

            this.ticking = true;
        },

        /**
         * cross browser window scroll Y position
         * @return {Number} Current window.scrollY position
         */
        _getY :function() {
            var y = this.supportPageOffset ? window.pageYOffset : this.isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
            return y;
        },

        /**
         * scroll handler
         * updates perviousY record and sets latestY record to current scroll position
         * calls requestTick
         */
        _onScroll :function() {
            this.previousY = this.latestScrollY;
            this.latestScrollY = this._getY(); // current scroll position
            this._requestTick();
        },

        /**
         * clean up view.
         */
        remove: function () {

            // don't forget to call the original remove() function
            Backbone.View.prototype.remove.call(this);
        },

        /**
         * called after view is added to DOM
         */
        onShow: function(view, region, options) {
            // react to when a view has been shown

        },

        onBeforeShow: function(view, region, options) {
            console.log('HeaderView onBeforeShow', view, region, options);
        }


    });

    return StickyHeaderView;

});
