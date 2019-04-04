import ACTIONS from "./action";
import _ from "lodash";
import validate from "./validate"
const defaultState = {
  items:[],
  signedIn: false,
  passWord: "pass",
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  error: false
};

const sorter = {
  "monday": 1,
  "tuesday": 2,
  "wednesday": 3,
  "thursday": 4,
  "friday": 5,
  "saturday": 6,
  "sunday": 7
};

const todoReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.Types.CREATE_ITEM: {
      console.log(action);
      let item = action.payload,
      check = validate(item, state.items);
      if(check.title && check.day) {
        let newItem = { id: state.items.length + 1, title: item.title, description: item.item, day: item.day, tags: item.tags.split(',') };
        let newState = _.cloneDeep(state);
        newState.items.push(newItem);
        newState.items.sort(function sortByDay(a, b) {
          var day1 = a.day.toLowerCase();
          var day2 = b.day.toLowerCase();
          return sorter[day1] > sorter[day2];
        });
        newState.error = false
        return newState;
      } else {
        let newState = _.cloneDeep(state);
        newState.error = true
        return newState;
      }
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