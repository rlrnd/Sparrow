import Ember from 'ember';

export default Ember.Route.extend({

  picklists: Ember.inject.service(),
  fileID: null,
  templateName: null,

  model: function() {
    var fid = this.get('fileID');
    // require('finch/patient/model');
    return this.get('store').find('file',fid);
  },

  beforeModel: function(transition) {
    var fid = parseInt(transition.queryParams.file,10);
    if( isNaN(fid)) {
      fid =  6;
    }
    this.set('fileID', fid);

    var fname = transition.queryParams.form;
    if(!fname) {
      fname = "xxyy";
    }
    this.set('templateName', 'forms/'+fname);
    return Ember.RSVP.all([
      Ember.$.getScript('/api/models'),
      this.get('picklists').fetchList("EquipmentSubTypes"),
      Ember.$.getScript('/api/compiledForms/'+fname)
    ]);
  },

  // There are 3 manual changes
  // 1. change ()) to )()
  // 2. change \n to \\n
  // 3. for expression, put the \\ in front of quote

  renderTemplate: function() {
      this.render(this.get('templateName'));
  }

});
