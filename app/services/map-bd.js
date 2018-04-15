import Service from '@ember/service';
import { on, load } from 'app-mobile/utils';
import { bdMapAk as ak } from 'app-mobile/models/data';
import Evented from '@ember/object/evented';

export default Service.extend(Evented, {
  fnQueue: '',
  @on('init')
  async serviceInit() {
    this.set('fnQueue', this.get('fnQueue') || []);
    let fnMapLoadedName = 'fnMapLoaded';
    window[fnMapLoadedName] = () => this.fnMapLoaded();
    load(`//api.map.baidu.com/api?v=3.0&ak=${ak}&callback=${fnMapLoadedName}&filetype4load=.js`);
  },
  @on('mapLoaded')
  flushQueue() {
    let fns = this.get('fnQueue');
    fns.forEach(el => {
      try {  // 执行函数时组件可能已经销毁
        el.fn.apply(el.context, el.params);
      } catch (error) {
        console.log(error.message);
      }
    });
  },
  fnMapLoaded() {
    this.set('isLoaded', true);
    this.trigger('mapLoaded');
  },
  pushFn(context, fn, ...params) {
    if (this.get('isLoaded')) {
      fn.apply(context, params);
    } else {
      this.get('fnQueue').pushObject({ fn, context, params });
    }
  }
});
