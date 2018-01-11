import React, { Component } from 'react';
import { v4 } from 'uuid';
import './Creator.css';
import moneyImg from './image/money.png';
import batteryImg from './image/batteryfull.png';
import lensImg from './image/lens.png';
import paintImg from './image/paintbrush.png';
import cameraImg from './image/polaroidcamera.png';
import ProductList from './ProductList';
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
      linkedItem: [],
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
    this.onLinkProduct = this.onLinkProduct.bind(this);
    this.onBack = this.onBack.bind(this);
    this.openedState = this.openedState.bind(this);
    this.openedLinkState = this.openedLinkState.bind(this);
    this.chooseItem = this.chooseItem.bind(this);
    this.changeSum = this.changeSum.bind(this);
  }
  changeSum(){
  	var newSum = 0, a
    const res = this.state.resultList
    for (var i = 0; i < res.length; i++) {
      a = Number(res[i].data.productPrice, 10)
      newSum += a * res[i].count
    }
    if (this.state.sum !== newSum) {
      this.setState({sum: newSum});
    }
  }

  openedState(){
    this.setState({isOpened: !this.state.isOpened});
  }

  openedLinkState(){
    this.setState({isLinkOpened: !this.state.isLinkOpened});
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

  onLinkProduct(id){
  	const { resultList } = this.state
    const rest = resultList.filter((item) => item.id === id)
  	this.setState({
  		isLinkOpened: true,
  		linkedItem: rest,
  	})
  }

  onBack(){
  	this.setState({
  		isLinkOpened: false,
  	})
  }

  chooseItem(item){
  	this.setState({
  		currentImage: item,
  		isOpened: !this.state.isOpened,
  	})
  }

   componentWillReceiveProps(nexProps){
    const res = this.resultList;
    console.log(res, this.sum)
    for (var i = 0; i < res.length; i++) {
      var a = Number(res[i].data.productPrice)
      nexProps += a * res[i].count
    }
    if (this.props.sum !== nexProps) {
      this.setState({sum: nexProps})
    }
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
	          <p>
	            <button className="button" onClick={this.onDecrease}>-</button>
	            <label> {this.state.productCount} </label>
	            <button className="button" onClick={this.onIncrease}>+</button>
	          </p>
	          <button className="buttonMenu" onClick={this.openedState}>
	            <img src={this.state.currentImage} alt='' />
	          </button>
	          <div>
	          	<ul className="standartListUL">{listImage}</ul>
	          </div>
	          <button className="button" onClick={this.onSubmit}>Add to Card</button>
	        </div>
		      <ProductList
		      	isLinkOpened={this.state.isLinkOpened}
		      	resultList={this.state.resultList}
		      	linkedItem={this.state.linkedItem}
		      	sum={this.state.sum}
		      	changeSum={this.changeSum}
		      	onItemIncrease={this.onItemIncrease}
	          onItemDecrease={this.onItemDecrease}
	          onDelete={this.onDelete}
	          onLinkProduct={this.onLinkProduct}
	          onBack={this.onBack}
		      />
	      </div>
	    </div>
    )
  }
}
  
export default Creator;
