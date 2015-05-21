/* global define, Modernizr */

define([
    'backbone',
    'marionette',
    'lodash'
], function(Backbone, Marionette, _) {

    'use strict';

    Marionette.TransitionRegion = Marionette.Region.extend({

        // css to apply to el before transitioning
        transitionInCss: {
            //opacity: 0
        },

        // should transitions on leaving and entering view run at the same time
        concurrentTransition: true,

        // keep track of whether animating is in progress
        isAnimatingOut : false,
        isAnimatingIn : false,

        _queuedView : null,
        _queueOptions : null,

        _queued : null,

        _inQueueView : null,        // view queued up to be animated in
        _inQueueOptions : null,     // options associated with incoming view

        // This is queue manager code that doesn't belong in regions.
        // maybe when this transition region is in Marionette,
        // you will be some sort of mixin for a region.
        setQueue: function(view, options) {
            this._queuedView = view;
            this._queueOptions = options;

            console.log('setQueue', this._queueOptions);
        },

        /**
         * sets incoming view
         * @param {Object} view    view instance
         * @param {Object} options view options
         */
        setInQueue: function(view, options) {
            this._inQueueView = view;
            this._inQueueOptions = options;
        },

        _clearInQueue: function() {
            delete this._inQueueView;
            delete this._inQueueOptions;
        },

        /**
         * checks que for an incoming view, if none set, listences for animateIn event and calls showQuue
         * @return {Boolen|Undefined} [description]
         */
        checkQueue: function() {
            if (this._queued) {
                return false;
            }

            this._queued = true;
            // listen for incoming view's animated in end
            this.once('animateIn', _.bind(this.showQueue, this));
        },

        /**
         * calls region's show methood passing queued view
         * @return {Undefined}
         */
        showQueue: function() {
            this.show(this._queuedView, this._queuedOptions);
            this._queued = false;
            this.clearQueue();
        },

        /**
         * clears queued view and view options
         * @return {Undefined}
         */
        clearQueue: function() {
            delete this._queuedView;
            delete this._queuedOptions;
        },

        /**
         * overwrite region show fn
         * @param  {Object} view   in coming view
         * @param  {Options} options options object
         * @return {[type]}         [description]
         */
        show: function(view, options) {

            console.log(options);

            var currentView,
                animateOut,
                concurrent;

            /*            console.log('region --> about to show:', view);
                        console.log('region --> about to kill:', this.currentView);*/

            // If animating out, set the animateInQueue.
            // This new view will be what is transitioned in
            if (this.isAnimatingOut) {
                this.setInQueue(view, options);
                return this;
            } else if (this.isAnimatingIn) {
                this.setQueue(view, options);
                this.checkQueue();
                return this;
            }

            console.log('region --> show, beyond initial check, at this point');


            this.setInQueue(view, options);
            this.isAnimatingOut = true;

            this._ensureElement();

            // store current view in scope
            currentView = this.currentView;

            // set old view to current view
            this._oldView = this.currentView;

            animateOut = currentView && _.isFunction(this.currentView.animateOut);

            concurrent = this.getOption('concurrentTransition');

            // If the view has an animate out function, then wait for it to conclude and then continue.

            if (animateOut && !concurrent) {

                this.listenToOnce(currentView, 'animateOut', _.bind(this._onTransitionOut, this));
                currentView.animateOut();

                // Return this for backwards compat
                return this;

            } else if (animateOut && concurrent) {
                // Otherwise, execute both transitions at the same time

                // If the old view needs to stay e.g. a view transitions in over the top
                // don't call this
                currentView.animateOut();

                return this._onTransitionOut(currentView);

            } else {
                // Otherwise, simply continue.
                return this._onTransitionOut();
            }
        },


        /**
         * This is most of the original show function
         * @param  {Object} oldView view instance
         * @return {[type]}         [description]
         */
        _onTransitionOut: function(oldView) {

            var view,
                options,
                showOptions,
                isDifferentView,
                preventDestroy,
                forceShow,
                isChangingView,
                animatingIn,
                _shouldDestroyView,
                _shouldShowView,
                transitionInCss,
                shouldAnimate;

            console.log('region --> _onTransitionOut, old view =', oldView);

            // does this do anything?
            this.triggerMethod('animateOut', this.currentView);

            view = this._inQueueView;
            options = this._inQueueOptions;
            this._clearInQueue();

            // This is the last time to update what view is about to be shown.
            // At this point, any subsequent shows will cause a brand new animation phase
            // to commence.
            this.isAnimatingOut = false;
            this.isAnimatingIn = true;

            showOptions = options || {};
            isDifferentView = view !== this.currentView;
            preventDestroy = !!showOptions.preventDestroy;
            forceShow = !!showOptions.forceShow;

            // we are only changing the view if there is a view to change to begin with
            isChangingView = !!this.currentView;

            console.log('region --> is changing view = ', isChangingView);

            console.log(showOptions.dontAnimate);

            // The region is only animating if there's an animateIn method on the new view
            // and we haven't been told to not animate in options object
            animatingIn = _.isFunction(view.animateIn) && !showOptions.dontAnimate;

            // only destroy the view if we don't want to preventDestroy and the view is different
            _shouldDestroyView = !preventDestroy && isDifferentView && !this.getOption('concurrentTransition');


            // Destroy the old view
            if (_shouldDestroyView) {

                this.empty({
                    animate: false
                });
            }

            // show the view if the view is different or if you want to re-show the view
            _shouldShowView = isDifferentView || forceShow;

            // Cut things short if we're not showing the view
            if (!_shouldShowView) {
                return this;
            }

            // Render the new view, then hide its $el
            view.render();

            if (isChangingView) {
                this.triggerMethod('before:swap', view);
            }

            // before:show triggerMethods
            this.triggerMethod('before:show', view);

            if (_.isFunction(view.triggerMethod)) {
                view.triggerMethod('before:show');
            } else {
                this.triggerMethod.call(view, 'before:show');
            }

            // Only hide the view if we want to animate it
            if (animatingIn) {
                transitionInCss = view.transitionInCss || this.transitionInCss;
                view.$el.css(transitionInCss);
            }

            // Attach or append the HTML, depending on whether we
            // want to concurrently animate or not
            if (!this.getOption('concurrentTransition')) {
                this.attachHtml(view);
            } else {
                this.appendHtml(view);
            }

            this.currentView = view;

            // show triggerMethods
            this.triggerMethod('show', view);

            if (_.isFunction(view.triggerMethod)) {
                view.triggerMethod('show');
            } else {
                this.triggerMethod.call(view, 'show');
            }

            // If there's an animateIn method and we want to use it, then call it and wait for it to complete
            if (animatingIn) {
                this.listenToOnce(view, 'animateIn', _.bind(this._onTransitionIn, this, showOptions));
                view.animateIn();
                return this;
            }

            // Otherwise, continue on
            else {
                return this._onTransitionIn(showOptions);
            }
        },

        /**
         * Append the new child
         * @param  {Object} view instance
         */
        appendHtml: function(view) {
            this.el.appendChild(view.el);
        },

        /**
         * this overwrites Marionette's standard attachView
         * to fire a method on the current view
         * @param  {Object} view - view instance to show
         * @return {Object} region
         */
        attachView: function(view) {
            this.currentView = view;

            if (_.isFunction(view.attachView)) {
                view.attachView();
            }

            return this;
        },


        /**
         * called when new view is done animating
         * it removes old view and triggerMethod 'animateIn'
         * @param  {Object} options
         * @return {Object} this
         */
        _onTransitionIn: function(options) {

            var preventDestroy = options.preventDestroy,
                oldView = this._oldView;

            // // Destroy the old view
            if (!preventDestroy && oldView && !oldView.isDestroyed) {
                if (oldView.destroy) {
                    oldView.destroy();
                } else if (oldView.remove) {
                    oldView.remove();
                }
            }

            delete this._oldView;

            this.isAnimatingIn = false;
            this.triggerMethod('animateIn', this.currentView); // triggers onAnimateIn on region

            return this;
        },

        /**
         * Empty the region, animating the view out first if it needs to be
         * @param  {Object} options [description]
         */
        empty: function(options) {

            var view = this.currentView,
                animate;

            options = options || {};

            if (!view || view.isDestroyed) {
                return;
            }

            // Animate by default
            animate = options.animate === undefined ? true : options.animate;

            // Animate the view before destroying it if a function exists. Otherwise,
            // immediately destroy it
            if (_.isFunction(view.animateOut) && animate) {
                this.listenToOnce(this.currentView, 'animateOut', _.bind(this._destroyView, this));
                this.currentView.animateOut();
            } else {
                this._destroyView();
            }
        },

        /**
         * destroys the current view, called when emptying a region
         * either immediately or after animating out
         * @return {Undefined}
         */
        _destroyView: function() {

            var view = this.currentView;

            if (!view || view.isDestroyed) {
                return;
            }

            this.triggerMethod('before:empty', view);

            // call 'destroy' or 'remove', depending on which is found
            if (view.destroy) {
                view.destroy();
            } else if (view.remove) {
                view.remove();
            }

            this.triggerMethod('empty', view);

            delete this.currentView;
        }
    });

});
