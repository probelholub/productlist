import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './App.css';
import Creator from './Creator';
import { reducer } from './reducers';

const store = createStore(reducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Creator />
        </div>
      </Provider>
    );
  }
}

export default App;
