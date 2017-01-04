'use strict';

import View from '../view';

import actions from '../actions';

class OrderView extends View {

  validate(value) {
    return /^\d{9}$/.test(value);
  }

  events() {
    return {
      'click .button.ok':     (event) => this.$store.dispatch({
        type:  actions.ORDER_BEVERAGE,
        phone: this.el.querySelector('.input').value
      }),
      'keyup .input':         (event) => {
        const msg = this.el.querySelector('.msg');
        const order = this.el.querySelector('.button.ok');

        this.phone = event.target.value;
        if (!this.validate(this.phone)) {

          msg.innerHTML = 'Must be phone number';
          order.classList.add('disabled');
          order.classList.add('grey');

          return;
        }

        order.classList.remove('disabled');
        order.classList.remove('grey');

        msg.innerHTML = '';
      },
      'click .button.cancel': (event) => this.$store.dispatch({
        type: actions.NAVIGATE_LIST_OF_BEVERAGE,
      })
    };
  }

  html() {
    return `
      <div>
        <h4>Please enter you phone number for ordering beverages and we will call you back</h4>
        <div>
          <div class="msg warning"></div>
          <span>+380</span>
          <input type="text" name="phone" class="input"/>
        </div>
        <div>
          <div class="button small ok disabled grey">Order</div>
          <div class="button red small cancel">Cancel</div>
        </div>
      </div>
`;
  }
}

export default OrderView;