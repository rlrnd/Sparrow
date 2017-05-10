import Ember from 'ember';
import FormPartMixin from 'form-engine/mixins/form-part';
import { module, test } from 'qunit';

module('Unit | Mixin | form part');

// Replace this with your real tests.
test('it works', function(assert) {
  let FormPartObject = Ember.Object.extend(FormPartMixin);
  let subject = FormPartObject.create();
  assert.ok(subject);
});
