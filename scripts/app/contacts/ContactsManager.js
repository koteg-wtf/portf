define([
    'handlebars',
    './view/ContactsView',
    'text!./templates/contacts.hbs'
], function ( Handlebars, View, Template ) {
    'use strict';

    var ContactsManager = new Backbone.Manager({
        view: View,
        template: Template
    });

    return ContactsManager;
});