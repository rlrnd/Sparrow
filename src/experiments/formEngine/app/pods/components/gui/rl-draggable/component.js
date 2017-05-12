import Ember from 'ember';

export default Ember.Component.extend({ 
  
  classNames        : [ 'draggableItem' ],
  attributeBindings : [ 'draggable' ],
  draggable         : 'true',
  
  dragStart(event) {
    event.stopPropagation();
    this.sendAction('onDragStart', this);
    return event.dataTransfer.setData('text/data', Ember.get(this, 'content'));
  }

});
