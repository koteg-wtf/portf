define([
  'backbone',
  'handlebars'
], function ( Backbone, Handlebars ) {
  var _properties;

  Backbone.Manager = function ( options ) {
    if ( typeof options === 'object' ) {
      _properties = options;
    }

    if ( this.initialize ) this.initialize();
  };

  Backbone.Manager.prototype.initialize = function () {
    if ( _properties.view && _properties.template ) {
      var View = _properties.view;

      this.view = new View({
        template: Handlebars.compile(_properties.template),
        model: new Backbone.Model
      });
      this.initiated = true;
      this.moduleEl  = this.view.render().el;
    } else {
      throw new Error('View or template was not found');
    }
  };

  Backbone.Manager.prototype.get = function ( prop ) {
    if ( !this.view ) this.initialize();

    return ( this[prop] ) ? this[prop] : false;
  };

  Backbone.Manager.prototype.set = function ( prop, value ) {
    this[prop] = value;
  };

  Backbone.Manager.prototype.renderNestedView = function ( parent, childEl ) {
    var view = this.get('view');

    if ( view.renderNestedView ) view.renderNestedView( parent, childEl );
  };

  Backbone.Manager.prototype.setModel = function ( data ) {
      var view = this.get('view');

      view.model.set(data);
  }
});