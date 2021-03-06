import ACTIONS from "./action";
import _ from "lodash";
import validate from "./validate"
const defaultState = {
  items:[
    {"id":1,"title":"Monday task","description":"I wrote some code","day":"Monday","date":"6 April 2019","tags":"teg1"},
    {"id":2,"title":"Tuesday task","description":"I had a meeting","day":"Tuesday","date":"7 April 2019","tags":"meeting"},
    {"id":3,"title":"wednesday task","description":"had a stand up","day":"Wednesday","date":"8 April 2019","tags":"standup"}],
  signedIn: false,
  passWord: "pass",
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  error: false,
  tags: ['teg1','meeting','standup']
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

const formatDate = (date) => {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

const todoReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.Types.CREATE_ITEM: {
      console.log(action);
      let item = action.payload,
      check = validate(item, state.items);
      if(check.title && check.day && check.date) {
        let newItem = { id: state.items.length + 1, title: item.title, description: item.item, day: item.day, date: formatDate(new Date()), tags: item.tags };
        let newState = _.cloneDeep(state);
        newState.items.push(newItem);
        newState.tags.push(item.tags.split(','))
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
      return newState;
    }
    case ACTIONS.Types.FILTER_BY_TAG: {
      let newState = _.cloneDeep(state);
      newState.items = newState.items.filter(item => item.tags === action.payload);
      return newState;
    }
    default:
      return state;
  }
};
export default todoReducer;