import ACTIONS from "./action";
import _ from "lodash";
const defaultState = {
  items: [],
  signedIn: false,
  passWord: "pass"
};
const todoReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.Types.CREATE_ITEM: {
      console.log(action);
      let item = action.payload;
      let newItem = { id: state.items.length + 1, title: item.title, description: item.item, date: item.date, tags: item.tags };
      let newState = _.cloneDeep(state);
      newState.items.push(newItem);
      return newState;
    }
    case ACTIONS.Types.DELETE_ITEM: {
      let newState = _.cloneDeep(state);
      let index = _.findIndex(newState.items, { id: action.payload });
      newState.items.splice(index, 1);
      return newState;
    }
    case ACTIONS.Types.SIGN_IN: {
      let newState = _.cloneDeep(state);
      newState.signedIn = true;
      return newState;
    }
    case ACTIONS.Types.SIGN_OUT: {
      let newState = _.cloneDeep(state);
      newState.signedIn = false;
      newState.items = [];
      return newState;
    }
    default:
      return state;
  }
};
export default todoReducer;