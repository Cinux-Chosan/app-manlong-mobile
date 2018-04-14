
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
        rej('load超时');
      }
    }, interval);
  })
}


function load(files) {
  load.cache = load.cache || {};
  if (files instanceof Array) {
    return Promise.all(files.map(el => load(el)));
  } else if (typeof files === 'string') {
    return new Promise((res) => {
      if (load.cache[files]) return res();
      if (~files.indexOf('.js')) {
        let script = document.createElement('script');
        script.src = files;
        script.onload = () => res(load.cache[files] = true);
        document.body.appendChild(script);
      }
      if (~files.indexOf('.css')) {
        let link = document.createElement('link');
        link.onload = () => res(load.cache[files] = true);
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