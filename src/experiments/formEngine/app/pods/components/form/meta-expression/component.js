import Ember from 'ember';
import metaForm from 'form-engine/pods/components/form/meta-form/component';

export default Ember.Component.extend({
  tagName: '',

  didReceiveAttrs() {
    this._super(...arguments);
    var mf = this.nearestOfType(metaForm);
    if (mf) {
      var depends = this.get('depends');
      if (depends) {
        depends = depends.split(',');
        mf.addExpression(this.get('id'), this.get('content'), depends);
      }
    }
  }

});
