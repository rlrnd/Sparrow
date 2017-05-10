/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');

module.exports = function(defaults) {
    var app = new EmberApp(defaults, {
        "ember-cli-babel": {
            includePolyfill: true,
        },
        fingerprint: {
            enabled: false
        },
        contentSecurityPolicy: {
            'default-src': "'self' 'unsafe-inline'",
            'frame-src': "'self' 'unsafe-inline'",
            'script-src': "'self' 'unsafe-eval'",
            'font-src': "'self'",
            'connect-src': "'self' http://localhost:*",
            'img-src': "'self'",
            'style-src': "'self' 'unsafe-inline'",
            'media-src': "'self'"
        },
        sassOptions: {
            includePaths: [
                'bower_components/bootstrap-sass/assets/stylesheets',
                'bower_components/font-awesome/scss',
                'bower_components/open-sans-fontface'
            ]
        }
    });
    var openSansFonts = new Funnel('bower_components/bootstrap-sass/assets/fonts/bootstrap', {
        srcDir: '/',
        include: ['**/*.*'],
        destDir: '/fonts/bootstrap'
    });

    var extraAssets = new Funnel('bower_components/open-sans-fontface/fonts', {
        srcDir: '/',
        include: ['**/*.*'],
        destDir: 'assets/fonts'
    });

    app.import('bower_components/bootstrap-sass/assets/javascripts/bootstrap.js');
    var tree = app.toTree(new mergeTrees([extraAssets,openSansFonts]));
    return tree;
};
