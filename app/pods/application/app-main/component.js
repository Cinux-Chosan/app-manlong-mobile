import Component from '@ember/component';
import {
  on
} from 'app-mobile/utils';

export default Component.extend({
  @on('didInsertElement')
  domInsert() {
    let f7App = new window.Framework7({
      // App root element
      root: '#app',
      // App Name
      name: 'My App',
      // App id
      id: 'com.myapp.test',
      // Enable swipe panel
      panel: {
        swipe: 'left',
      },
      theme: 'ios',
      view: {
        iosDynamicNavbar: false
      }
    });

    window.f7MainView = f7App.views.create('.view-main');
    window.f7App = f7App;
  }
});
