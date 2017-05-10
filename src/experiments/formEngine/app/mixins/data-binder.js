import Ember from 'ember';
import metaForm from 'form-engine/components/form/meta-form/component';

function dispatch(fn, args) {
  fn = (typeof fn === "function") ? fn : window[fn]; // Allow fn to be a function object or the name of a global function
  return fn.apply(this, args || []); // args is optional, use an empty array by default
}

export default Ember.Mixin.create({
  formatStr: function(s, vs) {
    for (let i = 0; i < arguments.length; i++) {
      let reg = new RegExp("\\{" + i + "\\}", "gm");
      s = s.replace(reg, "this.get('" + vs[i] + "')");
    }
    return s;
  },

  // base = 'file.equipments.equipmentSettings'
  // field name in expression = 'file.patient.firstName'
  // final field name in property = equipment.file.patient.firstName

  resolveRelativePath: function(target) {
    let bind = this.get('bind');

    let inflector = new Ember.Inflector();
    if (target.startsWith) {
      if (!target.startsWith('file')) {
        window.alert('bad things happened');
        /*How to handle this error?*/
      } else if (target.startsWith(bind)) {
        return target.substring(bind.length + 1);
      } else {
        let pathBase = bind.split('.');
        let pathTarget = target.split('.');
        let result = [];
        let i = pathBase.length - 2;
        while (i >= 0) {
          if (i < pathTarget.length) {
            result.push(inflector.singularize(pathBase[i]));
            if (pathBase[i] === pathTarget[i]) {
              break;
            }
          }
          i--;
        }
        i++;
        while (i < pathTarget.length) {
          result.push(pathTarget[i]);
          i++;
        }
        return result.join('.');
      }
    }
  },

  resolveExpression: function(exprID) {
    if (!this.hasOwnProperty(exprID)) {
      let mf = this.nearestOfType(metaForm);
      if (mf) {
        let exp = mf.getExpression(exprID);
        let flds = [];
        for (let i = 0; i < exp.depends.length; i++) {
          let relPath = this.resolveRelativePath(exp.depends[i]);
          flds.push('data.' + relPath);
        }
        let statement = "return (" + this.formatStr(exp.content, flds) + ");";
        let args = new Ember.A(flds);
        args.push(new Function(statement));

        Ember.defineProperty(this, exprID, dispatch(Ember.computed, args));
      }
    }
    return exprID;
  }
});
