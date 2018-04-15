import EmberObject from '@ember/object';
import BdMapMixin from 'app-mobile/mixins/bd-map';
import { module, test } from 'qunit';

module('Unit | Mixin | bd-map', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let BdMapObject = EmberObject.extend(BdMapMixin);
    let subject = BdMapObject.create();
    assert.ok(subject);
  });
});
