import Ember from 'ember';
import dataBinder from 'form-engine/mixins/data-binder';
import metaForm from 'form-engine/pods/components/form/meta-form/component';

export default Ember.Component.extend(dataBinder, {
  tagName: '',
  didReceiveAttrs () {
    this._super(...arguments);
    let form = this.nearestOfType(metaForm);
    if(form) {
      this.set('data', form.get('data'));
      this.set('bind', this.get('data._internalModel.modelName'));
    }
  }
});
