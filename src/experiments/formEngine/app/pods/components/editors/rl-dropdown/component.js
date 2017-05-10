import Ember from 'ember';
import rlEditor from 'form-engine/mixins/rl-editor';
import formPart from 'form-engine/mixins/form-part';
import dropdownExpressions from 'form-engine/mixins/dropdown-expressions';

export default Ember.Component.extend(rlEditor, formPart, dropdownExpressions, {

  picklists: Ember.inject.service(),

  classNames: ['rl-editors-border'],

  onValueChanged: Ember.computed(function() {
    return this.getfieldProperty('onValueChanged');
  }),

  allowNull: Ember.computed(function() {
    return this.getfieldProperty('allowNull');
  }),

  options: Ember.computed('optionItems.@each.visibility', function() {
    let result = [];
    this.get('optionItems').forEach(function(itm){
        if (itm.get('visibility'))  {
          result.pushObject({caption: itm.caption, value: itm.value});
        }
    });
    return result;
  }),

  selectedOption: Ember.computed('value', function() {
    let v = this.get('value');
    let opts = this.get('options');
    let allowNull = this.get('allowNull');
    if (opts && opts.length) {
      for (let i = 0; i < opts.length; i++) {
        if (opts[i]['value'] === v) {
          return opts[i];
        }
      }
      if (!allowNull && opts.length > 0) {
        return opts[0];
      }
    }
    return null;
  }),

  actions: {
    optionSelected: function(v) {
      this.set('value', v.value);
      let oc = this.get('onValueChanged');
      if (oc) {
        oc(v);
      }
    },
  }

});
