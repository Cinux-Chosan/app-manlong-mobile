import Route from '@ember/routing/route';
import { check } from 'app-mobile/utils';

export default Route.extend({
  async beforeModel() {
    await check(() => window.f7App);
    f7App.toolbar.hide(f7App.$('.toolbar'));
  },
  actions: {
    async willTransition() {
      await check(() => window.f7App);
      f7App.toolbar.show(f7App.$('.toolbar'));
    }
  }
});
