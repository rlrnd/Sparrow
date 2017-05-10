import Ember from 'ember';

export default Ember.Controller.extend({
    
  picklists: Ember.inject.service(),
  fileForms: Ember.inject.service(),

  beforeModel() {
    this.get('picklists').fetchList("EquipmentSubTypes");
    return Ember.$.getScript('api/models');
  },

  model(/*params*/) {
    return this.get('store').findRecord('file', 6);
  }

});
