import Ember from 'ember';
import RlEditorMixin from 'form-engine/mixins/rl-editor';
import { module, test } from 'qunit';

module('Unit | Mixin | rl editor');

// Replace this with your real tests.
test('it works', function(assert) {
  let RlEditorObject = Ember.Object.extend(RlEditorMixin);
  let subject = RlEditorObject.create();
  assert.ok(subject);
});
