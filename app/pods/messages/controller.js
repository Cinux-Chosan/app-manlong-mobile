import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    goChat() {
      this.transitionToRoute('chat');
    }
  }
});
