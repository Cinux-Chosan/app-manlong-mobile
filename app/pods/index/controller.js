import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    openSearch() {
      this.set('openSearch', true);
    }
  }
});
