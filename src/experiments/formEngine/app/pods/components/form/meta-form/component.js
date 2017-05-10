import Ember from 'ember';
import validatedForm from 'ember-stickler/components/validated-form/component';
import formLayout from 'ember-stickler/components/validated-form/template';

export default validatedForm.extend({
  classNames: ['meta-form-border'],
  template: formLayout,

  knownExpressions: null,

  init() {
    this._super(...arguments);
    this.set('knownExpressions', {});
  },

  addExpression: function(exprID, exprContent, exprDepends) {
    let list = this.get('knownExpressions');
    if (!Ember.isNone(list[exprID])) {
      return;
    }

    list[exprID] = {
      id: exprID,
      content: exprContent,
      depends: exprDepends
    };
  },

  getExpression: function(exprID) {
    return this.get('knownExpressions.' + exprID);
  },

});
