import Service from '@ember/service';
import { on, observes, load } from 'app-mobile/utils';
import { bdMapAk as ak } from 'app-mobile/models/data';

export default Service.extend({
  mapLoaded: false,
  fnQueue: '',
  @on('init')
  async serviceInit() {    
    this.set('fnQueue', this.get('fnQueue') || []);
    let fnMapLoadedName = 'fnMapLoaded';
    window[fnMapLoadedName] = this.get('fnMapLoaded').bind(this);
    load(`//api.map.baidu.com/api?v=3.0&ak=${ak}&callback=${fnMapLoadedName}&filetype4load=.js`);
  },
  @observes('mapLoaded')
  flushQueue() {
    if (this.get('mapLoaded')) {
      let fns = this.get('fnQueue');
      fns.forEach(el => el.fn.apply(el.context, el.params));
    }
  },
  fnMapLoaded() {
    this.set('mapLoaded', true);
  },
  push(context, fn, ...params) {
    if (this.get('mapLoaded')) {
      fn.apply(context, params);
    } else {
      this.get('fnQueue').pushObject({ fn, context, params });
    }
  }
});
