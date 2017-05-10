import Ember from 'ember';
import metaField from 'form-engine/pods/components/form/meta-field/component';

export default Ember.Mixin.create({

  fieldContainer: null,

  init() {
    this._super(...arguments);
    this.set('fieldContainer', this.nearestOfType(metaField));
  },

  getfieldProperty: function(pn) {
    let result = this.get('fieldContainer');
    if (!result) {
      result = this.nearestOfType(metaField);
      this.set('fieldContainer', result);
    }
    return (result != null) ? result.attrs[pn] : null;
  },

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('register-as', this);
  },

  actions: {
    doValueChange: function() {
      let f = this.get('fieldContainer');
      if (f) {
        f.send('doValueChange');
      }
    },
  }

});
