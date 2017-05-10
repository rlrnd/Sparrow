import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('form/meta-listview-display-template', 'Integration | Component | form/meta listview display template', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{form/meta-listview-display-template}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#form/meta-listview-display-template}}
      template block text
    {{/form/meta-listview-display-template}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
