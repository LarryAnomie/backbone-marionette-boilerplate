Backbone Marionette Transitions
===============================

An opinionated boilerplate for rapidly building Marionette/Backbone front-end apps with transitioned views.

Heavily borrows from :

* https://github.com/jmeas/marionette.transition-region
* https://github.com/ajaxray/marionette-boilerplate
* https://github.com/thejameskyle/marionette-wires

THIS IS A WORK IN PROGRESS AND IS UNFINISHED

## Requirements

* Node
* Grunt
* Bower
* Sass

## Getting started

Clone repo

Install development dependencies from the root of the project

        npm install


Install dev and app depenencies from the root of the project

        bower install


Build app:

        grunt

## Development Workflow

During development, you can preview your app from locahost:

        grunt serve


This runs a watch task that will compile sass, autoprefix css, lint js and runs a livereload server.

To preview the build version of your app:

        grunt serve:dist


To build your app:

        grunt


The default grunt task builds a distribution version of your app, it includes:

* Sass compilation
* CSS autoprefixing
* Image and SVG optimisation
* reving file names to cache bust
* JS liniting
* HTML and CSS minification
* An optimised require.js build which replaces require with almond.js
* A custom Modernizr build using only the tests used in the app

* * *

## Misc.

* Bower is used to manage frontend dependencies
* Require is used as a js module loader

