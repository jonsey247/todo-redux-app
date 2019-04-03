import ACTIONS from "./action";
import _ from "lodash";
const defaultState = {
  items:[{"id":1,"title":"test 1","description":" text text sladf ", date: "2019-05-25", "tags":"teg"},{"id":2,"title":"asdf","description":"asdf","date":"2019-05-25","tags":"teg"},{"id":3,"title":"the","description":"test","date":"2019-05-25","tags":"teg"}, {"id":4,"title":"test 4","description":" text text sladf ", date: "2019-05-26", "tags":"teg"}],
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
    case ACTIONS.Types.FILTER_BY_DATE: {
      let newState = _.cloneDeep(state);
      console.log('payload: ',action.payload)
      console.log('newstate ',newState)
      newState.items = newState.items.filter(item => item.date === action.payload);
      return newState;
    }
    default:
      return state;
  }
};
export default todoReducer;