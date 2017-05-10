import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('form/meta-form-body', 'Integration | Component | form/meta form body', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{form/meta-form-body}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#form/meta-form-body}}
      template block text
    {{/form/meta-form-body}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
