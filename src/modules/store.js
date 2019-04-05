import { createStore, applyMiddleware } from "redux";
import {saveState , loadState} from './localStorage';
import lodash from 'lodash';
// Logger with default options
import logger from "redux-logger";
import reducer from "./reducer";
const persistedState = loadState();
export default function configureStore(initialState) {
  const store = createStore(reducer, initialState, applyMiddleware(logger));
  store.subscribe(lodash.throttle(() => {
    saveState({
      items: store.getState().items,
      signedIn: store.getState().signedIn
    });
  }, 1000));
  return store;
}