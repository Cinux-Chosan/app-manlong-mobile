import Component from '@ember/component';

export default Component.extend({
  classNames: 'card-header',
  actions: {
    rightBtnClicked() {
      this.get('rightBtnClicked') && this.get('rightBtnClicked')();
    }
  }
});
