import Application from '@ember/application';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';
import Component from '@ember/component';
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { guidFor } from '@ember/object/internals';

const App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;

let base = {
  localClassNames: 'root',
  _uid: computed(function() { return guidFor(this); }),
  _subId: computed(function () { return this.get('_uid') + '_'; })
}

Component.reopen(base)
Controller.reopen(base);