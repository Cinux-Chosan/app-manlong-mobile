import Component from '@ember/component';
import { inject as service } from "@ember/service";
import { on } from 'app-mobile/utils';
import $ from 'jquery';
import styles from './styles';

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
    this.customeCtrl();
    // see: https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-permissions-in-cross-origin-iframes
    // check(() => {
      // if (!f7App.$('iframe[src*="//api.map.baidu.com"]').attr('allow')) {
        // f7App.$('iframe[src*="//api.map.baidu.com"]').attr('allow', 'geolocation');
      // }
    // })
  },
  setCenter() {
    let map = this.get('map');
    let { lng = 121.491, lat = 31.233 } = JSON.parse($.cookie('uLocation') || false) || {};
    map.centerAndZoom(new window.BMap.Point(lng, lat), 16);
    this.get('geo').getLocation(function(r) {
      if (this.getStatus() == window.BMAP_STATUS_SUCCESS) {
        let mk = new BMap.Marker(r.point);
        map.addOverlay(mk);
        map.panTo(r.point);
        $.cookie('uLocation', JSON.stringify(r.point), { expires: 30, path: '/' });
      } else {
        alert('定位失败：' + this.getStatus()); 
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
    
    let f = this.customeCtrl()
    map.addControl(new f);
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
  },

  // 自定义地图控件
  customeCtrl() {
    function ctrlChild() {
      this.defaultAnchor = window.BMAP_ANCHOR_TOP_RIGHT;
      this.defaultOffset = new BMap.Size(2, 2);
      this.initialize = function(map) {
        let containerEl = map.getContainer();
        let el = document.createElement('div');
        el.innerHTML = '<span>放大</span>'
        el.className= styles['customCtrlPopMap'];
        containerEl.appendChild(el);
        return el;
      }
    }
    ctrlChild.prototype = new BMap.Control;
    return ctrlChild;
  }
});
