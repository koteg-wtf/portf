define([
    'handlebars',
    './view/SidebarView',
    'text!./templates/sidebar.hbs'
], function ( Handlebars, View, Template ) {
    'use strict';

    var SidebarManager = new Backbone.Manager({
        view: View,
        template: Template
    });

    SidebarManager.toggleSidebar = function () {
        var view = SidebarManager.get('view');

        view.toggleSidebar.call(view);
    };

    return SidebarManager;
});