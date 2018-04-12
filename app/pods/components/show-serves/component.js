import Component from '@ember/component';
import { on } from 'app-mobile/utils';

export default Component.extend({
  classNames: 'block',
  left: '',
  right: '',
  allServes: '',
  @on('init')
  compInit() {
    this.set('left', this.get('left') || []);
    this.set('right', this.get('right') || []);
    this.set('allServes', this.get('allServes') || []);
  },
  @on('didInsertElement')
  domInsert() {
    this.get('allServes').pushObject({
      src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523547326584&di=3a8db44284de659bd3e5e5772a06ce26&imgtype=0&src=http%3A%2F%2Fwww.jituwang.com%2Fuploads%2Fallimg%2F150331%2F258807-1503310SF295.jpg',
      title: '苹果 MacBook 2018 款',
      price: 2018,
      paidNum: 1434
    });
    this.get('left').pushObject({
      src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523547326584&di=3a8db44284de659bd3e5e5772a06ce26&imgtype=0&src=http%3A%2F%2Fwww.jituwang.com%2Fuploads%2Fallimg%2F150331%2F258807-1503310SF295.jpg',
      title: '苹果 MacBook 2018 款',
      price: 2018,
      paidNum: 1434
    });
    this.get('left').pushObject({
      src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523547326584&di=3a8db44284de659bd3e5e5772a06ce26&imgtype=0&src=http%3A%2F%2Fwww.jituwang.com%2Fuploads%2Fallimg%2F150331%2F258807-1503310SF295.jpg',
      title: '苹果 MacBook 2018 款',
      price: 2018,
      paidNum: 1434
    });
    this.get('right').pushObject({
      src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523547326584&di=3a8db44284de659bd3e5e5772a06ce26&imgtype=0&src=http%3A%2F%2Fwww.jituwang.com%2Fuploads%2Fallimg%2F150331%2F258807-1503310SF295.jpg',
      title: '苹果 MacBook 2018 款',
      price: 2018,
      paidNum: 1434
    });
    this.get('right').pushObject({
      src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523547326584&di=3a8db44284de659bd3e5e5772a06ce26&imgtype=0&src=http%3A%2F%2Fwww.jituwang.com%2Fuploads%2Fallimg%2F150331%2F258807-1503310SF295.jpg',
      title: '苹果 MacBook 2018 款',
      price: 2018,
      paidNum: 1434
    });

  }
});
