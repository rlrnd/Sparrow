import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('editors/rl-label', 'Integration | Component | editors/rl label', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{editors/rl-label}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#editors/rl-label}}
      template block text
    {{/editors/rl-label}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
