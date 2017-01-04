'use strict';

export default function fetch(url, method, fn) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.send(null);

  xhr.onreadystatechange = function () {
    const DONE = 4; // readyState 4 means the request is done.
    const OK   = 200; // status 200 is a successful return.
    if (xhr.readyState === DONE) {
      if (xhr.status === OK) {
        fn(null, JSON.parse(xhr.responseText))
      }
    }
  }
};
