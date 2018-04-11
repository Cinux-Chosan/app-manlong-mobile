import Component from '@ember/component';
import { on, check } from  'app-mobile/utils';

export default Component.extend({
  classNames: 'popup',
  @on('didInsertElement')
  async domInsert() {
    await check(() => f7App);
    let popup = f7App.popup.create({
      el: this.$().get(0)
    });
    this.set('popup', popup);
  }
});
