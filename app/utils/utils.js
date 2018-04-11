import $ from 'jquery';

function check(fn, timeout = 15000) {
  let interval = 30;
  let wasted = interval;
  return new Promise((res, rej) => {
    let timer = setInterval(() => {
      if (fn()) {
        clearInterval(timer);
        res();
      } else if ((wasted += interval) > timeout) {
        clearInterval(timer);
        rej(new Error('load超时'));
      }
    }, interval);
  })
}

var fileLoaded = {};

function load(files) {
  if (files instanceof Array) {
    return Promise.all(files.map(el => load(el)));
  } else if (typeof files === 'string') {
    return new Promise((res) => {
      if (fileLoaded[files]) return res();
      if (files.endsWith('.js')) {
        return $.getScript(files).then(() => res(fileLoaded[files] = true));
      }
      if (files.endsWith('.css')) {
        let link = document.createElement('link');
        link.onload = () => res(fileLoaded[files] = true);
        link.rel = 'stylesheet';
        link.href = files;
        document.head.appendChild(link);
      }
    });
  }
}

export {
  load,
  check
}