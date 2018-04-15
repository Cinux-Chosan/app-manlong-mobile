import Component from '@ember/component';
import { on } from 'app-mobile/utils';
import styles from './styles';
import bdmapMixin from 'app-mobile/mixins/bd-map';

export default Component.extend(bdmapMixin, {

  @on('mapInitialized')
  mapInited() {
    this.addCustomControls();
  },

  // 自定义地图控件
  customeZoomInCtrl() {
    let customeZoomInCtrl = this.customeZoomInCtrl;
    if (customeZoomInCtrl.cache) return customeZoomInCtrl.cache;
    function zoomIn() {
      this.defaultAnchor = window.BMAP_ANCHOR_BOTTOM_RIGHT;
      this.defaultOffset = new BMap.Size(2, 2);
      this.initialize = function(map) {
        let containerEl = map.getContainer();
        let el = document.createElement('div');
        el.innerHTML = '<a class="d-block link iconfont icon-enlarge" href="javascript:;"></a>'
        el.className= styles['customCtrlPopMap'];
        el.addEventListener('click', ()=> alert('customCtrlClicked'))
        containerEl.appendChild(el);
        return el;
      }
    }
    zoomIn.prototype = new BMap.Control;
    return customeZoomInCtrl.cache = zoomIn;
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
  addCustomControls() {
    let map = this.get('map');
    let zoomIn = this.customeZoomInCtrl();
    map.addControl(new zoomIn);
  }
});
