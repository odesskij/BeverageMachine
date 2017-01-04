'use strict';

class Store {
  constructor(reducer, initialState) {
    this.reducer    = reducer;
    this.state      = initialState;
    this.subscribes = [];
  }

  dispatch(action) {
    setTimeout(() => {
      const state = this.reducer(this.state, action);
      if (state !== this.state) {
        this.state = state;
        this.subscribes.forEach((fn) => fn(state));
      }
    }, 10);
  }

  run() {
    this.subscribes.forEach((fn) => fn(this.state));
  }

  subscribe(fn) {
    this.subscribes = [...this.subscribes, fn];
  }
}

export default Store;