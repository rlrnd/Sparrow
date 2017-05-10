import Ember from 'ember';
import DS from 'ember-data';

export default DS.RESTSerializer.extend({

  fileForms: Ember.inject.service(),

  extractMeta: function(store, typeClass, payload) {
    if (payload && payload.hasOwnProperty('meta')) {
      let meta = payload.meta;
      this.get('fileForms').setFileForm(6, meta);
      delete payload.meta;
      return meta;
    }
  }
});
