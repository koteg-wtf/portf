//
// RequireJS Config File
require.config({
    paths: {
        jquery: 'vendors/jquery',
        underscore: 'vendors/underscore',
        backbone: 'vendors/backbone',
        handlebars: 'vendors/handlebars',
        text: 'vendors/text'
    },

    packages: [
        // Core Package
        {
            name: 'Manager',
            location: 'app/core',
            main: 'manager.backbone'
        },

        // Router Package
        {
            name: 'Router',
            location: 'app/route',
            main: 'router'
        },

        // Main Module
        {
            name: 'Main',
            location: 'app/main',
            main: 'MainManager'
        },

        // Sidebar Module
        {
            name: 'Sidebar',
            location: 'app/sidebar',
            main: 'SidebarManager'
        },

        // About Module
        {
            name: 'About',
            location: 'app/about',
            main: 'AboutManager'
        },

        // Portfolio Module
        {
            name: 'Folio',
            location: 'app/folio',
            main: 'FolioManager'
        },

        // Contacts Module
        {
            name: 'Contacts',
            location: 'app/contacts',
            main: 'ContactsManager'
        }
    ]
});

require([
    'app/app',
    'text!../locale.json',
    'app/core/manager.backbone'
], function ( App, appData ) {
    'use strict';
    var data = JSON.parse(appData);

    App.initialize( data );
});