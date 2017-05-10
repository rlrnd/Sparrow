import Ember from 'ember';

export default Ember.Service.extend({

  lists: Ember.Object.create(),

  fetchList: function(listName) {
    let self = this;
    if (self.get('lists.listName')) {
      return null;
    } else {
      return Ember.RSVP.resolve(Ember.$.getJSON('/api/lists/' + listName, function(data) {
        self.set('lists.' + listName, data.list);
      }));
    }
  }

});
