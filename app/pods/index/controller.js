import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    openSearch(event) {
      event.target.blur();
      this.set('openSearch', true);
    }
  }
});
