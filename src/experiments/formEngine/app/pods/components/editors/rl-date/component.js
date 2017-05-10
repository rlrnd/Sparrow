import Ember from 'ember';
import rlEditor from 'form-engine/mixins/rl-editor';

export default Ember.Component.extend(rlEditor, {
  classNames: ['rl-editors-border'],

  textInputMask: Ember.computed('dateMode', function() {
    var type = this.get('dateMode');
    if (!type) {
      type = 'date';
    } else {
      type = type.toLowerCase();
    }
    // Need to have a better way to handle this.
    switch (type) {
      case 'datetime':
        return 'YYYY-MM-DD HH:mm:SS';
      case 'time':
        return 'HH:mm:SS';
      default:
        return 'YYYY-MM-DD';
    }
  }),


});
