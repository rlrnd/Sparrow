import Ember from 'ember';

export default Ember.Service.extend({

  fileForms: Ember.Object.create(),

  setFileForm: function( fid, frmName ) {
    this.get('fileForms')[fid] = frmName;
  },

  getFileForm: function( fid ) {
    return this.get('fileForms')[fid];
  }

});
