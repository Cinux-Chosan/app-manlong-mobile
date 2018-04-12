import Component from '@ember/component';
import { on, check } from  'app-mobile/utils';

export default Component.extend({
  @on('didInsertElement')
  async domInsert() {
    await check(() => f7App);
    f7App.swiper.create(this.$('.swiper-container').get(0), {
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination'
      }
    });
  }
});
