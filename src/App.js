import React, { Component } from "react";
import "./App.css";
import ToDO from "./Pages/todo";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./modules/store";
const reduxStore = configureStore(window.REDUX_INITIAL_DATA);
class App extends Component {
  render() {
    return (
      <ReduxProvider store={reduxStore}>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">ToDo Redux app</h1>
          </header>
          <ToDO />
        </div>
      </ReduxProvider>
    );
  }
}
export default App;
