'use strict';

import View from '../view';

import actions from '../actions';

class ListOfBeveragesView extends View {
  events() {
    return {
      'click .button.beverage': (event) => this.$store.dispatch({
        type:     actions.SELECT_BEVERAGE,
        beverage: { name: event.target.dataset.beverage }
      }),
      'click .button.order':    (event) => this.$store.dispatch({
        type: actions.NAVIGATE_ORDER_BEVERAGE,
      })
    };
  }

  html() {
    return this
        .$store
        .state
        .beverages
        .filter((beverage) => beverage.available)
        .map((beverage) => `<div><div class="button beverage" data-beverage="${beverage.name}">${beverage.name}</div></div>`)
        .join('') + `<div><div class="button blue order">Order beverage</div></div>`;
  }
}

export default ListOfBeveragesView;