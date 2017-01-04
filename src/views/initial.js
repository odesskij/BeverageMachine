'use strict';

import View from '../view';

import actions from '../actions';

class InitialView extends View {

  events() {
    return {
      'click .link': (event) =>
                       this.$store.dispatch({ type: actions.NAVIGATE_LIST_OF_BEVERAGE })
    };
  }

  html() {
    return `<div class="button link">Beverage machine</div>`;
  }
}

export default InitialView;