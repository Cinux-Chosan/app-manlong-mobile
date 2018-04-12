import Component from '@ember/component';
import { inject as service } from "@ember/service";
import { on } from 'app-mobile/utils';

export default Component.extend({
  mapService: service('map-bd'),
  geo: service('geo'),
  @on('didInsertElement')
  domInsert() {
    this.get('mapService').push(this, this.get('setCenter'));
  },
  setCenter() {
    let map = new window.BMap.Map(this.get('elementId'));
    map.addEventListener('click', () => { this.get('mapClicked') && this.get('mapClicked')() });
    map.centerAndZoom(new window.BMap.Point(121.491, 31.233), 11);
    let geolocationControl = new BMap.GeolocationControl({
      enableAutoLocation: true
    });
    map.addControl(geolocationControl);
    this.get('geo').getLocation(function(r) {
      if (this.getStatus() == window.BMAP_STATUS_SUCCESS) {
        let mk = new BMap.Marker(r.point);
        map.addOverlay(mk);
        map.panTo(r.point);
        // alert('您的位置：' + r.point.lng + ',' + r.point.lat);
      } else {
        // alert('failed' + this.getStatus());
      }
    });
  }
});
