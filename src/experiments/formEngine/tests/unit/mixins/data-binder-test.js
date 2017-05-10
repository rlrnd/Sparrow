import Ember from 'ember';
import DataBinderMixin from 'form-engine/mixins/data-binder';
import { module, test } from 'qunit';

module('Unit | Mixin | data binder');

// Replace this with your real tests.
test('it works', function(assert) {
  let DataBinderObject = Ember.Object.extend(DataBinderMixin);
  let subject = DataBinderObject.create();
  assert.ok(subject);
});
