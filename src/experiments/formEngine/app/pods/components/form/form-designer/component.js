import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ["form-designer"],
  thisDesigner: null,

  designMode: false,
  classNameBindings: ['designMode'],

  borderStyle: Ember.computed('designMode', function () {
    let dm = this.get('designMode');
    return dm ? "focusedDesigner" : "unfocusedDesigner";
  }),

  componentClass: Ember.computed('def.type', function () {
    let n = this.get('def.type');
    if (n) {
      return 'form/' + n;
    }
    return "";
  }),

  childComponents: Ember.computed.alias('def.body'),
  hasChild: Ember.computed('def.body',function() {
    let c = this.get('def.body');
    return c && c.length;
  }),

  compAttributes: Ember.computed('def', function () {
    let def = this.get('def');
    let results = {};
    if (def) {
      for (let key in def) {
        if (key !== "type" || key !== "body") {
          results[key] = def[key];
        }
      }
    }
    return results;
  }),

  didReceiveAttrs() {
    let isNew = this.get('def.isNew');
    this.set('designMode', isNew);
    if (isNew) {
      this.set('def.isNew', undefined);
      let self = this;
      Ember.run.scheduleOnce('afterRender', function () {
        self.click();
      });
    }
  },

  init() {
    this._super(...arguments);
    this.set('thisDesigner', this);
  },

  click: function () {
    let ctrl = Ember.getOwner(this).lookup('controller:designerForm');
    if (ctrl) {
      ctrl.send("setCurrElement", this);
      return false;
    }
  },

  getOuterJson: function () {
    let def = this.get('def');
    return def;
  },

  actions: {
    addChild: function (c) {
      let cc = this.get('def.body');
      if (cc) {
        cc.pushObject(c);
      }
    },
    removeChild: function (c) {
      let cc = this.get('def.body');
      if (cc) {
        cc.removeObject(c);
      }
    },
    replaceChild: function (c1, c2) {
      let cc = this.get('def.body');
      if (cc) {
        let n = -1;
        for (let i = 0; i < cc.length; i++) {
          if (cc[i] === c1) {
            n = i;
            break;
          }
        }
        if (n >= 0) {
          cc.replace(n, 1, c2);
        }
      }
    },
    beginEdit: function () {
      this.set('designMode', true);
    },
    endEdit: function (def) {
      this.set('designMode', false);
      if (def) {
        this.set('def', def);
      }
    },

    generateJson: function () {
      let json = this.getOuterJson();
      let tes = JSON.stringify(json);
      window.alert(tes);
    },

    onDropAction: function(content) {
      let ctrl = Ember.getOwner(this).lookup('controller:designerForm');
      if(ctrl) {
        let n = 0;
        let children = this.$().find("div.form-designer");
        let c = document.elementFromPoint(event.clientX, event.clientY);
        if(children && children.length && c) {
          for(let i = 0; i< children.length; i++) {
            if(Ember.$.contains(children[i], c)) {
              n = i;
              break;
            }
          }
        }
        ctrl.send('beginAddElement', this, n);
      }
    }
  }

});
