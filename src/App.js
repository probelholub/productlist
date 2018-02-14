import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './App.css';
import Creator from './Creator';
import moneyImg from './image/money.png';

const initialState = {
  productName: '',
  productPrice: '',
  productCount: 1,
  resultList: [],
  currentImage: moneyImg,
  isOpened: false,
  isLinkOpened: false,
  linkedItem: [],
  sum: 0,
};

function reducer(state = initialState, action) {
	switch (action.type) {
    case 'ADD': {
      return {
        ...state,
        resultList: [...state.resultList, action.payload],
        productName: '',
        productPrice: '',
        productCount: 1,
        isOpened: false,
  	  }
    }
    case 'DELETE': {
      const id = action.payload
      const rest = state.resultList.filter((item) => item.id !== id)
      return {
        ...state,
        resultList: rest,
      }
    }
    case 'CHOOSE': {
      return {
        ...state,
        currentImage: action.payload,
    		isOpened: !state.isOpened,
      }
    }
    case 'BACK': {
      return {
        ...state,
        isLinkOpened: false,
      }
    }
    case 'LINK': {
      const id = action.payload
      const rest = state.resultList.filter((item) => item.id === id)
      return {
        ...state,
        isLinkOpened: true,
    		linkedItem: rest,
      }
    }
    case 'ITEM_INC': {
      const id = action.payload
      return {
        ...state,
        resultList: state.resultList.map((item) => {
          if (item.id !== id) {
            return item
          }

          return {
            ...item,
            count: item.count + 1,
          }
        }),
      }
    }
    case 'ITEM_DEC': {
      const id = action.payload
      return {
        ...state,
        resultList: state.resultList.map((item) => {
          if (item.id !== id) {
            return item
          }

          const count = item.count <= 1 ? 1 : item.count - 1
          return {
            ...item,
            count
          }
        })
      }
    }
    case 'INC': {
      return {
        ...state,
        productCount: state.productCount + 1,
      }
    }
    case 'DEC': {
      return {
        ...state,
        productCount: state.productCount <= 1 ? 1 : state.productCount - 1,
      }
    }
    case 'LINK_STATE': {
      return {
        ...state,
        isLinkOpened: !state.isLinkOpened,
      }
    }
    case 'OPEN_STATE': {
      return {
        ...state,
        isOpened: !state.isOpened,
      }
    }
    case 'SUM': {
      var newSum = 0, a
      const res = state.resultList
      for (var i = 0; i < res.length; i++) {
        a = Number(res[i].data.productPrice, 10)
        newSum += a * res[i].count
      }
      if (state.sum !== newSum) {
        return {
          ...state,
          sum: newSum,
        }
      }else {
        return state;
      }
    }
    case 'NAME': {
      return {
        ...state,
        productName: action.payload
      }
    }
    case 'PRICE': {
      return {
        ...state,
        productPrice: action.payload
      }
    }
  }
  return state;
}

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
