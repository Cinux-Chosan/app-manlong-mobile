import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('user-main');
  this.route('search');
  this.route('chat');
  this.route('messages');
  this.route('setting');
});

export default Router;
