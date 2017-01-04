'use strict';

class View {
  constructor({ el }) {
    this.el = el;
  }

  html() {
    return '';
  }

  events() {
    return {};
  }

  destroy() {

  }

  attachEvents() {
    const e = this.events();

    Object.keys(e).forEach((key) => {
      const [event, selector] = key.split(' ');
      this.el.querySelectorAll(selector).forEach((node) =>
        node.addEventListener(event, e[key], false));
    });


    // console.log(e.forEach((a, b) => console.log(a, b)))

  }

  render() {
    this.el.innerHTML = this.html();
    this.attachEvents();


  }
}

export default View;