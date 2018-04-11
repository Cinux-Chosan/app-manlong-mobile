'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const Funnel = require('broccoli-funnel');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    // Add options here
    babel: {
      plugins: [
        'transform-decorators-legacy', 'transform-object-rest-spread'
      ],
      presets: ["es2015", "stage-0"]
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  app.import('node_modules/framework7/dist/js/framework7.min.js');
  app.import('node_modules/framework7/dist/css/framework7.min.css');
  app.import('node_modules/framework7-icons/css/framework7-icons.css');


  let extraAssets = new Funnel('node_modules/framework7-icons/fonts/', {
     srcDir: '/',
     include: ['**/*'],
     destDir: 'fonts'
  });

  return app.toTree(extraAssets);
};
