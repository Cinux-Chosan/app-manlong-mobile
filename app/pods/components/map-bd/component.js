import Component from '@ember/component';
import { on, load } from 'app-mobile/utils';

export default Component.extend({
  @on('didInsertElement')
  async domInsert() {
    let ak = this.get('ak');
    let jsonPCallbackName = `${this.get('elementId')}_timestamp_${Date.now()}`;
    window[jsonPCallbackName] = this.get('initMap').bind(this);
    load(`//api.map.baidu.com/api?v=2.0&ak=${ak}&callback=${jsonPCallbackName}&filetype=.js`);
  },
  initMap() {
    var mp = new window.BMap.Map(this.get('elementId'));
    mp.centerAndZoom(new window.BMap.Point(121.491, 31.233), 11);
  },

  loadScript() {
    // var script = document.createElement("script");
    // script.src = ;
    // document.body.appendChild(script);
  }
});
