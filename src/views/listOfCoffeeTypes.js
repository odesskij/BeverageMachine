'use strict';

import View from '../view';

import actions from '../actions';

class ListOfCoffeeTypesView extends View {
  events() {
    return {
      'click .button.ok':     (event) => this.$store.dispatch({
        type:     actions.SELECT_BEVERAGE,
        beverage: { name: `Coffee ${this.el.querySelector('select').value}` }
      }),
      'click .button.cancel': (event) => this.$store.dispatch({
        type: actions.NAVIGATE_LIST_OF_BEVERAGE,
      })
    };
  }

  html() {

    return `
      <div>
        <label>
          <select>
          ${this
            .$store
            .state
            .coffeeTypes
            .filter((type) => type.available)
            .map((type) => `<option> ${type.type} </option>`)
            .join('')}
          </select>
        </label>
        <div>
          <div class="button small ok">OK</div>
          <div class="button red small cancel">Cancel</div>
        </div>
      </div>
`;

    return this
      .$store
      .state
      .coffeeTypes
      .filter((type) => type.available)
      .map((type) => `<div class="button beverage" data-type="${type.type}">${type.type}</div>`)
      .join('');
  }
}

export default ListOfCoffeeTypesView;