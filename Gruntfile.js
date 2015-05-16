'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths
    var config = {
        app: 'app',
        dist: 'dist'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: config,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: ['<%= config.app %>/assets/scripts/{,*/}*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            jstest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['test:watch']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            sass: {
                files: ['<%= config.app %>/assets/styles/**/*.{scss,sass}'],
                tasks: ['sass:server', 'autoprefixer']
            },
            styles: {
                files: ['<%= config.app %>/assets/styles/**/*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.app %>/{,*/}*.html',
                    '.tmp/assets/styles/{,*/}*.css',
                    '<%= config.app %>/assets/images/{,*/}*'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                open: true,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost',

                // http://danburzo.ro/grunt/chapters/server/
                /*                middleware: function(connect, options) {

                    var middleware = [];

                    // 1. mod-rewrite behavior
                    var rules = [
                        '!\\.html|\\.js|\\.css|\\.svg|\\.jp(e?)g|\\.png|\\.gif$ /index.html'
                    ];
                    middleware.push(rewrite(rules));

                    // 2. original middleware behavior
                    var base = options.base;
                    if (!Array.isArray(base)) {
                        base = [base];
                    }
                    base.forEach(function(path) {
                        middleware.push(connect.static(path));
                    });

                    return middleware;

                }*/

            },

            livereload: {
                options: {
                    middleware: function(connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use('/bower_components', connect.static('./bower_components')),
                            connect.static(config.app)
                        ];
                    },
                    rules: [{
                        from: '(^((?!css|html|js|img|fonts|\/$).)*$)',
                        to: "$1.html"
                    }]
                }
            },
            /*   test: {
                options: {
                    open: false,
                    port: 9001,
                    middleware: function(connect) {
                        return [
                            connect.static('.tmp'),
                            connect.static('test'),
                            connect().use('/bower_components', connect.static('./bower_components')),
                            connect.static(config.app)
                        ];
                    }
                }
            },*/
            dist: {
                options: {
                    base: '<%= config.dist %>',
                    livereload: false
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= config.dist %>/*',
                        '!<%= config.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= config.app %>/assets/scripts/{,*/}*.js',
                '!<%= config.app %>/assets/scripts/vendor/*',
                '!<%= config.app %>/assets/scripts/require.js',
                'test/spec/{,*/}*.js'
            ]
        },

        // Mocha testing framework configuration options
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
                }
            }
        },

        // Compiles Sass to CSS and generates necessary files if requested
        sass: {
            options: {
                sourceMap: true,
                includePaths: ['<%= config.app %>/assets/bower_components']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/assets/styles',
                    src: ['*.{scss,sass}'],
                    dest: '.tmp/assets/styles',
                    ext: '.css'
                }]
            },
            server: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/assets/styles',
                    src: ['*.{scss,sass}'],
                    dest: '.tmp/assets/styles',
                    ext: '.css'
                }]
            }
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/assets/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/assets/styles/'
                }]
            }
        },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= config.dist %>/assets/scripts/{,*/}*.js',
                        '<%= config.dist %>/assets/styles/{,*/}*.css',
                        //'<%= config.dist %>/assets/images/{,*/}*.*',
                        //'<%= config.dist %>/assets/styles/fonts/{,*/}*.*',
                        //'<%= config.dist %>/*.{ico,png}'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%= config.dist %>'
            },
            html: '<%= config.app %>/index.html'
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: ['<%= config.dist %>', '<%= config.dist %>/assets/images']
            },
            html: ['<%= config.dist %>/{,*/}*.html'],
            css: ['<%= config.dist %>/assets/styles/{,*/}*.css']
        },

        // produces minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/assets/images',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: '<%= config.dist %>/assets/images'
                }]
            }
        },

        // minifies svgs, places them in src folder ready for grunticon task to use
        //svgmin: {
        //    dist: {
        //        files: [{
        //            expand: true,
        //            cwd: '<%= config.app %>/assets/images/svg/src',
        //            src: '{,*/}*.svg',
        //            dest: '<%= config.app %>/assets/images/svg/optimised'
        //        }]
        //    }
        //},

        iconizr: {
            spriteSass: {
                src: ['<%= config.app %>/assets/images/svg/src'],
                dest: '<%= config.app %>/assets/images/svg/dist',
                options: {
                    preview: '../preview', // location of preview folder
                    dims: true, // dimensions added to generated css
                    keep: true, // keep individual svgs, not just the generated sprite
                    render: {
                        css: '', // no css
                        scss: '../../../styles/icons/_icons'
                    },
                    verbose: 1
                }
            }
        },

        // minifies html
        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>',
                    src: '{,*/}*.html',
                    dest: '<%= config.dist %>'
                }]
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: [
                        '*.{ico,png,svg,txt}',
                        '.htaccess',
                        'assets/images/{,*/}*.webp',
                        //'assets/images/svg/dist/icons/*.svg',
                        'assets/images/svg/dist/icons/*.{gif,jpeg,jpg,png,svg}',
                        '{,*/}*.html',
                        'assets/fonts/{,*/}*.*',
                        'assets/bower_components/bootstrap-sass-official/vendor/assets/fonts/bootstrap/*.*'
                    ]
                }]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%= config.app %>/assets/styles',
                dest: '.tmp/assets/styles/',
                src: '{,*/}*.css'
            }
        },

        // Generates a custom Modernizr build that includes only the tests you
        // reference in your app
        modernizr: {
            devFile: '<%= config.app %>/assets/bower_components/modernizr/modernizr.js',
            outputFile: '<%= config.dist %>/assets/scripts/vendor/modernizr.js',
            files: [
                '<%= config.dist %>/assets/scripts/{,*/}*.js',
                '<%= config.dist %>/assets/styles/{,*/}*.css',
                '!<%= config.dist %>/assets/scripts/vendor/*'
            ],
            uglify: true
        },

        // pretty standard require set up - use almond in production
        // removes combined files - good for Cordova apps
        requirejs: {
            compile: {
                options: {
                    removeCombined: true,
                    include: ['main'],
                    optimize: 'uglify',
                    findNestedDependencies: true, // this is need because of seperate config and main files
                    baseUrl: '<%= config.app %>/assets/scripts/',
                    mainConfigFile: '<%= config.app %>/assets/scripts/require-config.js',
                    //name: 'vendor/almond', // using almond in production build
                    name: '../bower_components/almond/almond', // base path is app/assets/scripts
                    out: '<%= config.dist %>/assets/scripts/main.js'
                }
            }
        },

        // replaces require script tag with smushed main.js (including almond)
        replace: {
            build: {
                src: '<%= config.dist %>/index.html',
                dest: '<%= config.dist %>/index.html',
                replacements: [{
                    from: '<script data-main="assets/scripts/main.js" src="assets/scripts/require.js"></script>',
                    to: '<script src="assets/scripts/main.js"></script>'
                }]
            }
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            server: [
                'sass:server',
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            dist: [
                'sass',
                'copy:styles',
                'imagemin'
                //'svgmin'
            ]
        }
    });

    grunt.loadNpmTasks('grunt-iconizr');

    grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function(target) {
        if (grunt.option('allow-remote')) {
            grunt.config.set('connect.options.hostname', '0.0.0.0');
        }
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function(target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run([target ? ('serve:' + target) : 'serve']);
    });

    grunt.registerTask('test', function(target) {
        if (target !== 'watch') {
            grunt.task.run([
                'clean:server',
                'concurrent:test',
                'autoprefixer'
            ]);
        }

        grunt.task.run([
            'connect:test',
            'mocha'
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'cssmin',
        'uglify',
        'iconizr',
        'copy:dist',
        'modernizr',
        'requirejs',
        'replace',
        'rev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        //'test',
        'build'
    ]);
};
