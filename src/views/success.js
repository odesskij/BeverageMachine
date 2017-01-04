'use strict';

import View from '../view';

import actions from '../actions';

class SuccessView extends View {

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
              <h2>You drink is ready!</h2>
          </div>
          <a href="#" class="link">
              <div class="button green">OK</div>
          </a>
      </div>
`;
  }
}

export default SuccessView;