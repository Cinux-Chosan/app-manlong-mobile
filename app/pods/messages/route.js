import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  async getMsgs() {
    return await [{
      title: '1123',
      avatar: 'http://www.w3school.com.cn/ui2017/compatible_chrome.png',
      lastMsgTime: '17:53',
      lastMsgText: '你们刚刚说什么?'
    }]
  },
  model() {
    return hash({
      msgs: this.getMsgs()
    });
  }
});
