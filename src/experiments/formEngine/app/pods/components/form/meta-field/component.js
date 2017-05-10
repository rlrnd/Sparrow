import Ember from 'ember';
import validatedForm from 'form-engine/components/validated-form';
import validatedWrapper from 'form-engine/components/validation-wrapper';
import formPart from 'form-engine/mixins/form-part';

export default validatedWrapper.extend(formPart, {
  tagName: 'span',
  classNameBindings: ['visible::hide'],
  visible: true,
  form: null,
  value: null,
  designerMode: false,

  edtiorKind: Ember.computed('editorType', function() {
      let t = this.get('editorType');
      switch(t) {
        case 'text': return 'editors/rl-text';
        case 'list': return 'editors/rl-dropdown';
        case 'date': return 'editors/rl-date';
        default: return 'editors/rl-label';
      }
  }),

  init() {
    let form = this.nearestOfType(validatedForm);
    this.set('form', form);
    this._super(...arguments);
    this.set('requiredMessage','errors.validation.required');
    if(form) {
      form.send('register', this);
    }
  },

  willDestroyElement() {
    this._super();
    let form = this.get('form');
    if(form) {
      form.send('forget', this);
    }
  },

  didReceiveAttrs(/*attrs*/) {
    this._super(...arguments);
    let bind = this.get('bind');
    if (bind){
      let binder = this.get('binder');
      if (binder) {
        let path = binder.resolveRelativePath(bind);
        this.set('value', Ember.computed.alias('binder.data.'+path));
      }
    }
    this.bindExprAttr('visibleExpression', 'visible', true);
    this.bindExprAttr('mandatoryExpression', 'mandatory', false);
    this.resetRules(this.get('mandatory'));
    this.bindExprAttr('readonlyExpression', 'readonly', false);
    //bindExprAttr('avaibilityExpression', 'available', true);
    this.send('validate', this.get('value'));
  },

  register() {
  },

  forget() {
  },

  metaRules: Ember.observer('mandatory', function(){
    this.resetRules(this.get('mandatory'));
    this.send('doValueChange');
  }),

  resetRules: function(m) {
    let owner = Ember.getOwner(this);
    let result = Ember.A([]);
    let mandatory = m;
    this.set('isRequired', mandatory);
    if( mandatory === true ) {
      result.addObject(owner._lookupFactory("validation:required"));
    }
    this.set('selectedRules',result);
    //send action?
  },

  errorMessage: Ember.computed('totalErrors.[]', function() {
    let totalErrors = this.get('totalErrors');
    if( totalErrors ) {
      for( let i = 0; i < totalErrors.length; i++ ) {
          return totalErrors[i];
      }
    }
    return "";
  }),

  actions: {
    doValueChange() {
      this.send('validate', this.get('value'));
    },
  }

});
