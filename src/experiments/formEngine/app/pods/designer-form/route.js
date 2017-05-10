import Ember from 'ember';

export default Ember.Route.extend({
  picklists: Ember.inject.service(),
  fileForms: Ember.inject.service(),
  beforeModel() {
    this.get('picklists').fetchList("EquipmentSubTypes");
    return Ember.$.getScript('api/models');
  },
  model: function() {
    return Ember.RSVP.hash({
      fakeData: this.get('store').findRecord('file', 6),
      def: Ember.$.getJSON( '/api/formDesigns/nf1')
    });
  },
});
