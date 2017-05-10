import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('form/meta-expressions', 'Integration | Component | form/meta expressions', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{form/meta-expressions}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#form/meta-expressions}}
      template block text
    {{/form/meta-expressions}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
