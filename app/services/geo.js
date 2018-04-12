import Service, { inject as service } from '@ember/service';
import { on, computed } from 'app-mobile/utils';

export default Service.extend({
  h5Geo: service('geo-h5'),
  wxGeo: service('geo-wx'),
  @computed()
  get env() {
    if (this.get('isWx')) {
      return 'wx';
    } else { // 默认为 h5
      return 'h5';
    }
  },
  @on('init')
  serviceInit() {
    //
  },
  getLocation() {
    switch (this.get('env')) {
      case 'wx':
        //
        break;
      case 'h5':
      default:
        this.get('h5Geo').getLocation(...arguments);
        break;
    }
  },

  @computed()
  get isWx() {
    return false; // 检测是否在微信当中, 并且是否已经有 sdk 权限
  }
});
