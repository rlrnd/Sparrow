import Ember from 'ember';
import dataBinder from 'form-engine/mixins/data-binder';

export default Ember.Mixin.create({
  binder: null,

  init() {
    this.set('binder', this.nearestOfType(dataBinder));
    this._super(...arguments);
  },

  bindExprAttr: function(exprPropName, propName, defaultValue) {
    let d = this.get(exprPropName);
    if (!Ember.isNone(d)) {
      if (d === true) {
        this.set(propName, true);
      } else if (d === false) {
        this.set(propName, false);
      } else {
        let binder = this.get('binder');
        if (binder) {
          let dProp = binder.resolveExpression(d);
          Ember.defineProperty(this, propName, Ember.computed.alias('binder.' + dProp));
        }
      }
    } else {
      this.set(propName, defaultValue);
    }
  }

});
