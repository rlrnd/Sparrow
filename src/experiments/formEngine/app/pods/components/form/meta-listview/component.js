import Ember from 'ember';
import formPart from 'form-engine/mixins/form-part';

export default Ember.Component.extend(formPart, {

  didReceiveAttrs () {
    this._super(...arguments);
    let bind = this.get('bind');
    if (bind) {
      let binder = this.get('binder');
      if (binder) {
        let path = binder.resolveRelativePath(bind);
        this.set('data', Ember.computed.alias('binder.data.' + path));
      }
    }
  }

});
