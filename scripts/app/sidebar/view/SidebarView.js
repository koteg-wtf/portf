define([
    'backbone'
], function ( Backbone ) {
    'use strict';

    var MainView = Backbone.View.extend({
        className: 'b-personal-info',
        childrenViews: [],

        events: {
            'click .e-userpic' : 'toggleSidebar'
        },

        initialize: function ( options ) {
            if ( typeof options === 'object' ) {
                for ( var key in options ) this[key] = options[key];
            }

            this.listenTo( this.model, 'change', this.render );
        },

        toggleSidebar: function () {
            this.$el.parent().toggleClass('m-tight-sidebar');
            this.tinySidebar = !this.tinySidebar;
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

    return MainView;
});