define([
    'handlebars',
    './view/MainView',
    'text!./templates/main.hbs'
], function ( Handlebars, View, Template ) {
    'use strict';

    var view;

    function MainManager () {
        this.initialize = function () {
            var view = new View({
                template: Handlebars.compile(Template)
            });

            console.log('MainManager initialized!');
        }
    }

    return new MainManager();
});