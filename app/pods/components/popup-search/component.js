import Component from '@ember/component';
import { later } from '@ember/runloop';
import { on, check, observes } from  'app-mobile/utils';

export default Component.extend({
  open: false,
  popup: '',
  chips: ['Example Chip', 'Another Chip', 'One More Chip', 'Fourth Chip', 'Last One'],
  @on('init')
  compInit() {
    this.set('chips', this.get('chips') || []);
  },
  @on('didInsertElement')
  async domInsert() {
    await check(() => f7App);
    f7App.views.create(this.$('.view').get(0));
  },
  @observes('open')
  async isOpenChanged() {
    let popup;
    let open = this.get('open');
    await check(() => popup = this.get('popup'));
    popup[open ? 'open' : 'close']();
    open && later(() => this.$('input').focus(), 400)  ;
  },
  actions: {
    close() {
      this.set('open', false);
    }
  }
});
