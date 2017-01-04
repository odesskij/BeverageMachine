'use strict';

import Store from './store';

import modalWrapper from './modalWrapper';
import fetch from './fetch';

import InitialView from './views/initial';
import ListOfBeveragesView from './views/listOfBeverages';
import ListOfCoffeeTypesView from './views/listOfCoffeeTypes';
import OrderView from './views/order';
import PrepareBeverageView from './views/prepareBeverage';
import SuccessView from './views/success';
import FailView from './views/fail';

import actions from './actions';

const store = new Store((state, action) => {
  switch (action.type) {
    case actions.NAVIGATE_INITIAL:
      return Object.assign({}, state, { view: 'initial' });
    case actions.NAVIGATE_LIST_OF_BEVERAGE:
      fetch('/api/beverages.json', 'GET', (err, response) =>
        store.dispatch({ type: actions.LOAD_LIST_OF_BEVERAGE, beverages: response.beverages }));
      return Object.assign({}, state, { view: 'listOfBeverages', beverages: [...state.beverages] });
    case actions.LOAD_LIST_OF_BEVERAGE:
      return Object.assign({}, state, { view: 'listOfBeverages', beverages: action.beverages });
    case   actions.NAVIGATE_LIST_OF_COFFEE_TYPES:

      fetch('/api/coffeeTypes.json', 'GET', (err, response) =>
        store.dispatch({ type: actions.LOAD_LIST_OF_COFFEE_TYPES, coffeeTypes: response.types }));
      return Object.assign({}, state, { view: 'listOfCoffeeTypes', coffeeTypes: [...state.coffeeTypes] });
    case actions.LOAD_LIST_OF_COFFEE_TYPES:
      return Object.assign({}, state, { view: 'listOfCoffeeTypes', coffeeTypes: action.coffeeTypes });

    case actions.NAVIGATE_ORDER_BEVERAGE:
      return Object.assign({}, state, { view: 'order' });

    case actions.ORDER_BEVERAGE:
      setTimeout(() =>
          // too massive computing
          fetch('/api/process.json', 'GET', (err, response) =>
            response.code === 0
              ? store.dispatch({ type: actions.NAVIGATE_SUCCESS })
              : store.dispatch({ type: actions.NAVIGATE_FAIL, message: response.message })
          )
        , 0.5 * 1000);
      return state;
    case actions.SELECT_BEVERAGE:
      if (action.beverage.name === 'Coffee') {
        store.dispatch({ type: actions.NAVIGATE_LIST_OF_COFFEE_TYPES });
        return state;
      }
      setTimeout(() =>
          // too massive computing
          fetch('/api/process.json', 'GET', (err, response) =>
            response.code === 0
              ? store.dispatch({ type: actions.NAVIGATE_SUCCESS })
              : store.dispatch({ type: actions.NAVIGATE_FAIL, message: response.message })
          )
        , 2 * 1000);
      return Object.assign({}, state, { view: 'prepareBeverage', beverage: action.beverage });
    case actions.NAVIGATE_SUCCESS:
      return Object.assign({}, state, { view: 'success' });
    case actions.NAVIGATE_FAIL:
      return Object.assign({}, state, { view: 'fail', message: action.message });
  }

  return state;
}, {
  beverages:   [],
  coffeeTypes: [],
  view:        'initial'
});

function connect(store, View) {
  return class extends View {
    constructor(args) {
      super(args);
      this.$store = store;
    }
  };
}


function onModalClose() {
  this.$store.dispatch({ type: actions.NAVIGATE_INITIAL });
}
const ViewMap = {
  initial:           connect(store, InitialView),
  listOfBeverages:   connect(store, modalWrapper(ListOfBeveragesView, {
    title:   'Beverages',
    onClose: onModalClose
  })),
  listOfCoffeeTypes: connect(store, modalWrapper(ListOfCoffeeTypesView, {
    title:   'Coffee Type',
    onClose: onModalClose
  })),
  order:             connect(store, modalWrapper(OrderView, {
    title:   'Order beverage',
    onClose: onModalClose
  })),
  prepareBeverage:   connect(store, modalWrapper(PrepareBeverageView, {
    title:   'Please wait.',
    onClose: false
  })),
  success:           connect(store, modalWrapper(SuccessView, {
    title:   'Thanks you!',
    onClose: onModalClose
  })),
  fail:              connect(store, modalWrapper(FailView, {
    title:   'Error',
    header:  'red',
    onClose: onModalClose
  }))
};

store.subscribe((() => {

  let view;
  let el = document.body;
  return (state) => {
    if (view) {
      view.destroy();
      view = null;
    }
    view = new ViewMap[state.view]({ el });
    view.render();
  }
})());

store.run();