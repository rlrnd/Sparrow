import Ember from 'ember';

export default Ember.Controller.extend({
  currElement: null,
  currDef: null,
  newPartName: "",
  actions: {
    setCurrElement: function (c) {
      let pc = this.get('currElement');
      if (pc) {
        pc.send('endEdit');
      }
      this.set('currElement', c);
      if (c) {
        let cdef = c.get('def');
        let cdef1 = JSON.parse(JSON.stringify(cdef));
        c.send('beginEdit');
        this.set('currDef', cdef1);
      }
    },
    duplicateField: function () {
      let cu = this.get('currElement');
      if (cu) {
        cu.send('endEdit');
        this.set('currElement', null);
        let cdef = cu.get('def');
        let cdef1 = JSON.parse(JSON.stringify(cdef));
        cdef1.isNew = true;
        let cp = cu.get('parent');
        if (cp) {
          cp.send('addChild', cdef1);
        }
      }
    },
    removeField: function () {
      let cu = this.get('currElement');
      if (cu) {
        let cdef = cu.get('def');
        let cp = cu.get('parent');
        if (cp) {
          cp.send('removeChild', cdef);
        }
      }
    },
    saveField: function () {
      let cu = this.get('currElement');
      if (cu) {
        cu.send('endEdit');
        this.set('currElement', null);
        let cp = cu.get('parent');
        if (cp) {
          let nd = this.get('currDef');
          nd.isNew = true;
          cp.send('replaceChild', cu.get('def'), nd);
        }
      }
    },
    showFieldJson: function () {
      let cu = this.get('currElement');
      if (cu) {
        cu.send('generateJson');
      }
    },
    dragStartAction: function (content) {
      this.set('newPartName', 'field');
    },
    dragEndAction: function (content) {
      // debugger;
    },
    beginAddElement: function ( designer, seq ) {
      let self = this;
      let elmName = self.get('newPartName');
      if (elmName) {
        let addModel = {
          def: {
            type: 'meta-field',
            editorType: 'text',
            caption: 'department',
            bind: 'file.department'
          },
          support: {
            caller: self,
            callBack: 'endAddElement',
            callParams: { 
              owner: designer,
              seq: seq,
              def: null,
              results: null
            }
          }
        };
        this.send('openDialog', 'designer-form/dialogs/field-properties', addModel, 'designer-form/dialogs/field-properties');
        // get x,y to tell where to insert? 
      }
    },
    endAddElement: function( callParams ) {
      let col = callParams.owner.def.body;
      let obj = callParams.def;
      let seq = callParams.seq;
      if(seq >= 0) {
        col.insertAt(seq, obj);
      }
      else {
        col.pushObject(obj);
      }
    }

  }
});
