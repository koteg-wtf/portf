define([
    'handlebars',
    './view/FolioView',
    'text!./templates/folio.hbs'
], function ( Handlebars, View, Template ) {
    'use strict';

    return new Backbone.Manager({
        view: View,
        template: Template
    });
});