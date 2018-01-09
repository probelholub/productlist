import React, { Component } from 'react';
import { v4 } from 'uuid';
import './Creator.css';
import moneyImg from './image/money.png';
import batteryImg from './image/batteryfull.png';
import lensImg from './image/lens.png';
import paintImg from './image/paintbrush.png';
import cameraImg from './image/polaroidcamera.png';
import ProductItem from './ProductItem';
import ListImg from './ListImg';

const prList = [batteryImg, lensImg, paintImg, cameraImg];
class Creator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productName: '',
      productPrice: '',
      productCount: 1,
      resultList: [],
      currentImage: moneyImg,
      isOpened: false,
      isLinkOpened: false,
      sum: 0,
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
    this.findSum = this.findSum.bind(this);
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
      productCount: prevState.productCount <= 1 ? 1 : prevState.productCount - 1
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
      data:	{
      	productName: this.state.productName,
        productPrice: this.state.productPrice,
        image: this.state.currentImage,
      },
      count: this.state.productCount,
      id: v4(),
    };
    this.setState({
      resultList: [
        ...this.state.resultList,
        obj,
      ],
      productName: '',
      productPrice: '',
      productCount: 1,
      currentImage: moneyImg,
      isOpened: false,
    })
  }

  onDelete(id) {
    const { resultList } = this.state
    const rest = resultList.filter((item) => item.id !== id)
    this.setState({
      resultList: rest
    })
  }

  chooseItem(item){
  	this.setState({
  		currentImage: item,
  		isOpened: !this.state.isOpened,
  	})
  }

  findSum(){
  	var newSum = 0;
  	const res = this.state.resultList.slice();
  	console.log(res, newSum);
  	for (var i = 0; i < res.length; i++) {
  		newSum += (parseInt(res[i].productPrice)) * res[i].count;
  	}
  	this.setState({sum: newSum})
  }

  render() {
  	var listImage
  	if(this.state.isOpened){
	  	listImage = prList.map((item) => {
	  		return (
	  			<ListImg 
	  			key={v4()} 
	  			item={item}
	  			chooseItem={this.chooseItem} />
	  			)
	  	})
  	}
    const items = this.state.resultList.map((item) => {
      return (
        <ProductItem
          key={v4()}
          id={item.id}
          count={item.count}
          onIncrease={this.onItemIncrease}
          onDecrease={this.onItemDecrease}
          onDelete={this.onDelete}
          data={item.data}
        />
      )
    });

    return (
      <div className="global">
      	<div className="globalTable">
	        <div className="columnMenu">
	          <h2>Add product to your cart list</h2>
	          <div>
		          <p>
		            <input
		             	className="input"
		              type="text"
		              name="product_name"
		              value={this.state.productName}
		              onChange={this.onProductNameChange}
		              placeholder='Product name...'
		            />
		          </p>
		          <p>
		            <input
		             	className="input"
		              type="number"
		              name="product_price"
		              value={this.state.productPrice}
		              onChange={this.onProductPriceChange}
		              placeholder='Product price...'
		            />
		          </p>
	          </div>
	          <div>
	            <button className="button" onClick={this.onDecrease}>-</button>
	            <label>{this.state.productCount}</label>
	            <button className="button" onClick={this.onIncrease}>+</button>
	          </div>
	          <button className="buttonMenu" onClick={this.openedState}>
	            <img src={this.state.currentImage} />
	          </button>
	          <div>
	          	<ul className="standartListUL">{listImage}</ul>
	          </div>
	          <button className="button" onClick={this.onSubmit}>Add to Card</button>
	        </div>
		      <div className="columnMenu">
		        <h2>Product list</h2>
		        <ul>
		        	{items}
		        	<li className="ProductItemLI">Final sum: {this.state.sum}</li>
		        </ul>
		      </div>
	      </div>
	    </div>
    )
  }
}
  
export default Creator;
