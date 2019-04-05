import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import action from './modules/action'; 

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('actions', () => {
  it('should create an item', () => {
    const payload = {title:"sdf",description:"sdf",day:"Thursday",tags:"sdf"}
    const expectedAction = {
      type: "CREATE_ITEM",
      payload
    }
    expect(action.createItem(payload)).toEqual(expectedAction)
  })
  it('should delete an item', () => {
    const payload = {id: 1}
    const expectedAction = {
      type: "DELETE_ITEM",
      payload
    }
    expect(action.deleteItem(payload)).toEqual(expectedAction)
  })
})
