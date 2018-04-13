import Service from '@ember/service';
import { computed } from 'app-mobile/utils';

export default Service.extend({
  @computed()
  get geolocation() {
    return new BMap.Geolocation();
  },
  getLocation(showPosition) {
    let geolocation = this.get('geolocation');
    geolocation.getCurrentPosition(showPosition, { enableHighAccuracy: true });
  }
});
