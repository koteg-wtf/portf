define([
    'handlebars',
    './view/MainView',
    'text!./templates/main.hbs'
], function ( Handlebars, View, Template ) {
    'use strict';

    var MainManager = new Backbone.Manager({
        view: View,
        template: Template
    });
    return MainManager;
});