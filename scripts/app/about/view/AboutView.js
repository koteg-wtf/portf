define([
    'backbone'
], function ( Backbone ) {
    'use strict';

    var AboutView = Backbone.View.extend({
        className: 'grd-row',
        childrenViews: [],

        events: {
            'click #printBtn' : 'printPage'
        },

        initialize: function ( options ) {
            if ( typeof options === 'object' ) {
                for ( var key in options ) this[key] = options[key];
            }

            this.listenTo( this.model, 'change', this.render );
        },

        printPage: function () {
            if ( window ) window.print();
        },

        render: function () {
            this.$el.empty().html(
                this['template'] ? this.template( this.model.toJSON() ) : 'Template not found!'
            );
            return this;
        },

        renderNestedView: function ( parentSelector, childEl ) {
            parentSelector = '#' + parentSelector;

            this.$( parentSelector ).html( childEl );
            this.childrenViews.push( childEl );
        }
    });

    return AboutView;
});