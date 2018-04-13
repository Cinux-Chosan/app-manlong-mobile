import Controller from '@ember/controller';
import { on, alias } from 'app-mobile/utils';

export default Controller.extend({
  @alias('model.msgs') msgs: [],
  @on('init')
  ctrlInit() {
  },
  actions: {
    goChat() {
      this.transitionToRoute('chat');
    }
  }
});
