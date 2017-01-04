'use strict';

import View from '../view';

import actions from '../actions';

class PrepareBeverageView extends View {
  html() {
    return `
      <div>
        <div>${this.$store.state.beverage.name}</div>
        <div><h2>Your beverage is preparing.</h2></div>
        <div><h3>It takes few a seconds.</h3></div>
      </div>
`;
  }
}

export default PrepareBeverageView;