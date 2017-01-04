'use strict';

export default function modalWrapper(View, { title, onClose, header }) {
  return class extends View {
    constructor(args) {
      super(args);

      this.container           = document.createElement('div');
      this.container.className = 'modal';
      document.body.appendChild(this.container);

      this.container.innerHTML =
        `<div class="modal-content">
                <div class="modal-header ${header}">
                    ${onClose ? '<a href="#/"><span class="close">&times;</span></a>' : ''}
                    <h2>${title}</h2>
                </div>
                <div class="modal-body">
                </div>
            </div>
          `;

      this.el = this.container.querySelector(`.modal-body`);

    }

    attachEvents() {
      super.attachEvents();
      if (onClose) {
        this.container
          .querySelector('.close')
          .addEventListener('click', onClose.bind(this), false);
        this.container
          .addEventListener('click', (event) => {
            if (event.target === this.container) {
              onClose.bind(this)();
            }
          }, false);
      }
    }

    destroy() {
      this.container.parentNode.removeChild(this.container);
      super.destroy();
    }

    render() {
      this.container.style.display = "block";
      super.render();
    }
  }
}