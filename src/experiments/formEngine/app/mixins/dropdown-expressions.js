import Ember from 'ember';
import metaForm from 'form-engine/pods/components/form/meta-form/component';
import dataBinder from 'form-engine/mixins/data-binder';

export default Ember.Mixin.create({

  picklists: Ember.inject.service(),
  optionItems: null,

  init: function () {
    this._super();
    let listName = this.getfieldProperty('listName');
    if (listName) {
      this.set('listName', listName);
      this.get('picklists').fetchList(listName);
    }
    this.set('binder', this.nearestOfType(dataBinder));
  },

  didReceiveAttrs: function () {
    let ln = this.get('listName');
    if (ln) {
      let list = this.get('picklists.lists.' + ln);
      let fm = this.nearestOfType(metaForm);
      if (fm) {
        let expressions = list.expressions;
        expressions.forEach(function (exp) {
          let depends = exp.depends;
          if (depends) {
            depends = depends.split(',');
            fm.addExpression(exp.id, exp.content, depends);
          }
        });
      }

      let options = Ember.A([]);
      let binder = this.get('binder');
      list.items.forEach(function (item) {
        let oi = Ember.Object.create({
          value: item.itemValue,
          caption: item.itemValue,
          visibility: null
        });
        if (item.visibility === true) {
          oi.visibility = true;
        } else if (item.visibility === false) {
          oi.visibility = false;
        } else if (item.visibility) {
          let expr = item.visibility;
          if (expr) {
            if (binder) {
              let dProp = binder.resolveExpression(expr);
              oi.set('binder', binder);
              Ember.defineProperty(oi, "visibility", Ember.computed.alias('binder.' + dProp));
            }
          }
        } else {
          oi.visibility = true;
        }
        options.addObject(oi);
      });
      this.set('optionItems', options);
    }
    return [];
  },

});
