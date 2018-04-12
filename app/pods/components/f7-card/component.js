import Component from '@ember/component';

export default Component.extend({
  classNames: 'card',
  actions: {
    rightBtnClicked() {
      this.get('rightBtnClicked') && this.get('rightBtnClicked')();
    }
  }
});
