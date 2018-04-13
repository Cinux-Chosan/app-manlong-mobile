import Component from '@ember/component';
import { inject as service } from "@ember/service";
import { on, check } from 'app-mobile/utils';

export default Component.extend({
  mapService: service('map-bd'),
  geo: service('geo'),
  unBounds: '',
  @on('init')
  initComp() {
    this.set('unBounds', []);
  },
  @on('didInsertElement')
  domInsert() {
    this.get('mapService').pushFn(this, this.initMap);  // 地图初始化函数推入 service 待执行队列
  },
  initMap() {
    let map = new window.BMap.Map(this.get('elementId'));
    this.set('map', map);
    this.addMapEvents();
    this.addControl();
    this.setCenter();
    // see: https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-permissions-in-cross-origin-iframes
    // check(() => {
      // if (!f7App.$('iframe[src*="//api.map.baidu.com"]').attr('allow')) {
        // f7App.$('iframe[src*="//api.map.baidu.com"]').attr('allow', 'geolocation');
      // }
    // })
  },
  setCenter() {
    let map = this.get('map');
    map.centerAndZoom(new window.BMap.Point(121.491, 31.233), 16);

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
  },

  addControl() {
    let { map, mapLocationSuccess, mapLocationError, unBounds } = this.getProperties(['map', 'mapLocationSuccess', 'locationError', 'unBounds']);
    let geoCtrl = new BMap.GeolocationControl({ enableAutoLocation: true });
    mapLocationSuccess && geoCtrl.addEventListener('locationSuccess', mapLocationSuccess);
    mapLocationError && geoCtrl.addEventListener('locationError', mapLocationError);
    map.addControl(geoCtrl);
    unBounds.pushObject({
      el: geoCtrl,
      events: {
        locationSuccess: mapLocationSuccess,
        mapLocationError: mapLocationError
      }
    })
  },

  addMapEvents() {
    let { map, mapClicked, unBounds } = this.getProperties(['map', 'mapClicked', 'unBounds']);
    mapClicked && map.addEventListener('click', mapClicked);
    unBounds.pushObject({
      el: map,
      events: {
        click: mapClicked
      }
    });
  },

  @on('willDestroyElement')
  compDestroy() {  // 移除所有事件, 防止内存泄露
    let { unBounds } = this.getProperties(['unBounds']);
    unBounds.forEach(item => {
      let { el, events } = item;
      if (item && el) {
        for (const event in events) {
          if (events.hasOwnProperty(event)) {
            const handler = events[event];
            el.removeEventListener(event, handler);
          }
        }
      }
    })
  }
});
