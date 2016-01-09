define([
    'backbone'
], function ( Backbone ) {
    'use strict';

    var MainView = Backbone.View.extend({
        el: '#app',

        initialize: function ( options ) {
            if ( typeof options === 'object' ) {
                for ( var key in options ) this[key] = options[key];
            }

            this.render();
        },

        render: function () {
            this.$el.empty().html(
                this['template'] ? this.template() : 'Template not found!'
            );
        }
    });

    return MainView;
});