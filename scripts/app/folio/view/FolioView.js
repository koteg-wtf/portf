define([
    'backbone'
], function ( Backbone ) {
    'use strict';

    var MainView = Backbone.View.extend({
        className: 'grd-row',
        childrenViews: [],

        initialize: function ( options ) {
            if ( typeof options === 'object' ) {
                for ( var key in options ) {
                    if (options.hasOwnProperty(key)) this[key] = options[key];
                }
            }

            this.listenTo( this.model, 'change', this.render );
        },

        render: function () {
            this.$el.empty().html(
                this['template'] ? this.template( this.model.toJSON() ) : 'Template not found!'
            );

            return this;
        },

        renderNestedView: function ( parentSelector, childEl ) {
            parentSelector = '#' + parentSelector;

            this.$( parentSelector).hide().html( childEl).fadeIn();
            this.childrenViews.push( childEl );
        }
    });

    return MainView;
});