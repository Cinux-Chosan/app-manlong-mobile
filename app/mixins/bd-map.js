import Mixin from '@ember/object/mixin';
import { inject as service } from "@ember/service";
import { on } from 'app-mobile/utils';
import $ from 'jquery';

export default Mixin.create({
  mapService: service('map-bd'),
  geo: service('geo'),
  unBounds: '',
  hasGeolocationControl: true,
  @on('init')
  initComp() {
    this.set('unBounds', []);
  },

  @on('didInsertElement')
  domInsert() {
    this.get('mapService').pushFn(this, this.initMap);  // 地图初始化函数推入 service 待执行队列
  },

  mapInitialized() {
    // ... 地图初始化完成过后的代码
    this.addControls();
    this.setCenter();
    this.resetLocation();
    this.addMapEvents();
  },

  addMapEvents() {
    // 添加地图的事件处理函数
  },

  addControls() {
    this.get('hasGeolocationControl') && this.addGeolocationControl();
  },
  initMap() {
    let map = new window.BMap.Map(this.get('elementId'));
    this.set('map', map);
    this.trigger('mapInitialized');
  },
  setCenter() {
    let map = this.get('map');
    let { lng = 121.491, lat = 31.233 } = JSON.parse($.cookie('uLocation') || false) || {};
    map.centerAndZoom(new window.BMap.Point(lng, lat), 16);
  },

  resetLocation() {
    let map = this.get('map');
    this.get('geo').getLocation(function(r) {
      if (this.getStatus() == window.BMAP_STATUS_SUCCESS) {
        let mk = new BMap.Marker(r.point);
        map.addOverlay(mk);
        map.panTo(r.point);
        $.cookie('uLocation', JSON.stringify(r.point), { expires: 30, path: '/' });
      } else {
        // alert('定位失败：' + this.getStatus());
      }
    });
  },

  addGeolocationControl() {
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
