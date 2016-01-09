define([
    'handlebars',
    './view/AboutView',
    'text!./templates/about.hbs'
], function ( Handlebars, View, Template ) {
    'use strict';

    var AboutManager = new Backbone.Manager({
        view: View,
        template: Template
    });

    return AboutManager;
});