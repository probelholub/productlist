import React, { Component } from 'react';
import { v4 } from 'uuid';
import './Creator.css';
import moneyImg from './image/money.png';
import batteryImg from './image/batteryfull.png';
import lensImg from './image/lens.png';
import paintImg from './image/paintbrush.png';
import cameraImg from './image/polaroidcamera.png';
import ProductItem from './ProductItem';

function ProductList(props){
  const productList = props.productList;
  const items = productList.map((item) => {
    const key = getKey(item);
    return (<li key={key} className="standartList">
      <button onClick=''>
        <img src={item} width="64px" heigth="64px" />
      </button>
    </li>);
  });
  return (<ul className="productList">{items}</ul>);
}

class Creator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: '',
        price: '',
        count: 1,
      },
      productName: '',
      productPrice: '',
      productCount: 1,
      resultList: [
        {
          productName: 'asd',
          productPrice: '213',
          id: v4(),
          count: 1,
        }
      ],
      currentImage: moneyImg,
      isOpened: false
    };

    this.onIncrease = this.onIncrease.bind(this);
    this.onDecrease = this.onDecrease.bind(this);
    this.onItemIncrease = this.onItemIncrease.bind(this);
    this.onItemDecrease = this.onItemDecrease.bind(this);
    this.onProductNameChange = this.onProductNameChange.bind(this);
    this.onProductPriceChange = this.onProductPriceChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.openedState = this.openedState.bind(this);
    this.chooseItem = this.chooseItem.bind(this);
    /*this.createResultList = this.createResultList.bind(this);*/
  }

  openedState(){
    this.setState({isOpened: !this.state.isOpened});
  }

  onProductNameChange(e){
    this.setState({productName: e.target.value});
  }

  onProductPriceChange(e) {
    this.setState({productPrice: e.target.value});
  }

  onIncrease(){
    this.setState(prevState => ({
      productCount: prevState.productCount + 1,
    }))
  }

  onDecrease(){
    this.setState(prevState => ({
      productCount: prevState.productCount - 1
    }))
  }

  onItemIncrease(id) {
    this.setState((prevState) => {
      return {
        resultList: prevState.resultList.map((item) => {
          if (item.id !== id) {
            return item
          }

          return {
            ...item,
            count: item.count + 1,
          }
        })
      }
    })
  }

  onItemDecrease(id) {
    this.setState((prevState) => {
      return {
        resultList: prevState.resultList.map((item) => {
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
    })
  }

  onSubmit(event){
    let obj = {
      productName: this.state.productName,
      productPrice: this.state.productPrice,
      count: this.state.productCount,
      id: v4(),
    };
    this.setState({
      resultList: [
        ...this.state.resultList,
        obj,
      ]
    })
  }

  onDelete(id) {
    const { resultList } = this.state
    const rest = resultList.filter((item) => item.id !== id)
    this.setState({
      resultList: rest
    })
  }

  chooseItem(idImg){
  	this.setState({currentImage: productList.idImg})
  }

  render() {
  	const productList = [batteryImg, lensImge, paintImg, cameraImg];

    const items = this.state.resultList.map((item) => {
      return (
        <ProductItem
          key={v4()}
          id={item.id}
          count={item.count}
          onIncrease={this.onItemIncrease}
          onDecrease={this.onItemDecrease}
          onDelete={this.onDelete}
        />
      )
    });

    return (
      <div>
        <div className="columnMenu">
          <h2>Add product to your cart list</h2>
          <p>
            <input
              type="text"
              name="product_name"
              value={this.state.productName}
              onChange={this.onProductNameChange}
              placeholder='Product name...'
            />
          </p>
          <p>
            <input
              type="number"
              name="product_price"
              value={this.state.productPrice}
              onChange={this.onProductPriceChange}
              placeholder='Product price...'
            />
          </p>
          <div>
            <button onClick={this.onDecrease}>-</button>
            <label>{this.state.productCount}</label>
            <button onClick={this.onIncrease}>+</button>
          </div>
          <button onClick={this.openedState}>
            <img src={this.state.currentImage} />
          </button>
          <ProductList productList={productList} />
          <button onClick={this.onSubmit}>Add to Card</button>
        </div>
        <div>
          <h2>Product list</h2>
          <ul>{items}</ul>
        </div>
      </div>
    )
  }
}
  
export default Creator;
