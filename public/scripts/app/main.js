// This is the main requirejs script

requirejs.config({
    // This defines aliases for requirejs modules, so you don't have to type the full path:
    paths: {
        'durandal': '../lib/durandal/js',
        'jquery': '../lib/jquery/jquery-1.9.1',
        'jquery.bootstrap': '../lib/bootstrap/bootstrap.min',
        'knockout': '../lib/knockout/knockout-3.1.0',
        'plugins': '../lib/durandal/js/plugins',
        'text': '../lib/require/text',
        'transitions': '../lib/durandal/js/transitions',
        'instafeed': '../lib/instafeed.min',
        'animation.on.scroll': 'http://ajax.aspnetcdn.com/ajax/modernizr/modernizr-2.7.2'
    },
    shim: {
        'instafeed': {exports: 'Instafeed'},
        'jquery.bootstrap': {deps: ['jquery']}
    }
});

// The application entry point:
define(function (require) {

    var app = require('durandal/app');
    var system = require('durandal/system');
    var viewLocator = require('durandal/viewLocator');

    system.debug(true);

    app.title = '';
    app.configurePlugins({
        observable: true, // eliminates need for `ko.observable(...)`
        router: true
    });

    // This call starts the client side view rendering and routing:
    app.start()
        .then(function () {
            viewLocator.useConvention();

            // This will call the application.js module, and use the 'entrance' animation to display the view.
            app.setRoot('application', 'entrance');
        });
});