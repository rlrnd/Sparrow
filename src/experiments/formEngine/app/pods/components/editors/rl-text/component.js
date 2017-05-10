import Ember from 'ember';
import rlEditor from 'form-engine/mixins/rl-editor';

export default Ember.Component.extend( rlEditor,  {

  inputMaxLength: function () {
    return this.getfieldProperty('editor-max-length');
  }.property(),

});
