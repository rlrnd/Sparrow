import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('gui/rl-draggable', 'Integration | Component | gui/rl draggable', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{gui/rl-draggable}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#gui/rl-draggable}}
      template block text
    {{/gui/rl-draggable}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
