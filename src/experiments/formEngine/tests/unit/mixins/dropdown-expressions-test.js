import Ember from 'ember';
import DropdownExpressionMixin from 'form-engine/mixins/dropdown-expression';
import { module, test } from 'qunit';

module('Unit | Mixin | dropdown expression');

// Replace this with your real tests.
test('it works', function(assert) {
  let DropdownExpressionObject = Ember.Object.extend(DropdownExpressionMixin);
  let subject = DropdownExpressionObject.create();
  assert.ok(subject);
});
