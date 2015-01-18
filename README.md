Dare Frontend Boilerplate
==========================

An opinionated boilerplate for rapidly building frontend apps. It can be used for quick prototyping or as the basis of a frontend build for a production app.

It is delete friendly - if you don't need something, feel free to get rid of it.

The boilerplate includes [jshint](http://www.jshint.com/) and [editorconfig](http://editorconfig.org/) files which are intended to maintain consistent coding styles between different projects, developers and IDEs/editors.

## Requirements

* Node
* Grunt
* Bower
* Ruby
* Sass
* Compass - (to be depecated)

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
* An optimised require.js build which replaces require with almond.js and rewrites the script tag in dist/index.html
* A custom Modernizr build using only the tests used in the app

* * *

## Misc.

* Bower is used to manage frontend dependencies
* Require is used as a js module loader

* * *

## Icon Workflow

* We are using [Iconzir](https://github.com/jkphl/grunt-iconizr) for automating the generation of css for svg icons with a png fallback.
* Upload svg icons to images/svg/icons/src and the iconizr grunt task will optmise them and generate an svg sprite, and sass files with data uris. [Read more about optimised SVG icon workflows](http://www.wearejh.com/design/svg-icon-sprites-optimized-workflow/)

## Old IE

- Jake Archibald's (Sass support for old IE)[http://jakearchibald.github.io/sass-ie/] is used to serve alternate stylesheets to old browsers lacking media query support
- Fallback png icons are used in place of SVG

* * *

## JavaScript

- This boilerplate comes with a simple require setup that includes the text plugin to load seperate template files. If you project doesn't require Require, feel free to delete it.

- It takes an educated guess that your project will be using jQuery, Lodash and Modernizr. Again, if you don't need 'em, delete 'em.

## TODO:

- recommended plugins for your editor/ide






