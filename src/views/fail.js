'use strict';

import View from '../view';

import actions from '../actions';

class FailView extends View {

  events() {
    return {
      'click .link': () =>
                       this.$store.dispatch({ type: actions.NAVIGATE_INITIAL })
    }
  }

  html() {
    return `
    <div>
      <div>
          <h2>${this.$store.state.message}</h2>
      </div>
    </div>
`;
  }
}

export default FailView;