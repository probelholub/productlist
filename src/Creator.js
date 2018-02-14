import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import './Creator.css';
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
    // this.disableButton = this.disableButton.bind(this);
  }
  changeSum(){
    this.props.onChangeSum()
  }
  openedState(){
    this.props.opState()
  }
  openedLinkState(){
    this.props.linkState()
  }
  onProductNameChange(e){
    this.props.nameChange(e)
  }
  onProductPriceChange(e) {
    this.props.priceChange(e)
  }
  onIncrease(){
    this.props.increase()
  }
  onDecrease(){
    this.props.decrease()
  }
  onItemIncrease(id) {
    this.props.itemIncrease(id)
  }
  onItemDecrease(id) {
    this.props.itemDecrease(id)
  }
  onSubmit(){
    let obj = {
      data:	{
      	productName: this.props.creatorStore.productName,
        productPrice: this.props.creatorStore.productPrice,
        image: this.props.creatorStore.currentImage,
      },
      count: this.props.creatorStore.productCount,
      id: v4(),
    }
    this.props.submit(obj)
  }
  onDelete(id) {
    this.props.delete(id)
  }
  onLinkProduct(id){
    this.props.linkProduct(id)
  }
  onBack(){
    this.props.back()
  }
  chooseItem(item){
    this.props.onChooseItem(item)
  }
  disableButton(){
  	if (this.props.creatorStore.productName.length > 0 && this.props.creatorStore.productPrice.length > 0) {
  		return false
  	} else{
  		return true
  	}
  }
  render() {
  	var listImage
  	if(this.props.creatorStore.isOpened){
	  	listImage = prList.map((item) => {
	  		return (
	  			<ListImg
	  			key={v4()}
	  			item={item}
	  			chooseItem={this.chooseItem} />
	  			)
	  	})
  	}
  	const isDisabled = this.disableButton();
    console.log(this.props.creatorStore.resultList);
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
		              value={this.props.creatorStore.productName}
		              onChange={this.onProductNameChange}
		              placeholder='Product name...'
		            />
		          </p>
		          <p>
		            <input
		             	className="input"
		              type="number"
		              name="product_price"
		              value={this.props.creatorStore.productPrice}
		              onChange={this.onProductPriceChange}
		              placeholder='Product price...'
		            />
		          </p>
	          </div>
	          <p>
	            <button className="button" onClick={this.onDecrease}>-</button>
	            <label> {this.props.creatorStore.productCount} </label>
	            <button className="button" onClick={this.onIncrease}>+</button>
	          </p>
	          <button className="buttonMenu" onClick={this.openedState}>
	            <img src={this.props.creatorStore.currentImage} alt='' />
	          </button>
	          <div>
	          	<ul className="standartListUL">{listImage}</ul>
	          </div>
	          <button type="button" className="button" disabled={isDisabled} onClick={this.onSubmit}>Add to Card</button>
	        </div>
		      <ProductList
		      	isLinkOpened={this.props.creatorStore.isLinkOpened}
		      	resultList={this.props.creatorStore.resultList}
		      	linkedItem={this.props.creatorStore.linkedItem}
		      	sum={this.props.creatorStore.sum}
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

export default connect(
	state => ({
		creatorStore: state
	}),
	dispatch => ({
		submit: (obj) => {
			dispatch({ type:'ADD', payload: obj })
		},
    delete: (id) => {
      dispatch({type:'DELETE', payload: id})
    },
    onChooseItem: (item) => {
      dispatch({type: 'CHOOSE', payload: item})
    },
    back: () => {
      dispatch({type: 'BACK'})
    },
    linkProduct: (id) => {
      dispatch({type:'LINK', payload: id})
    },
    itemDecrease: (id) => {
      dispatch({type:'ITEM_DEC', payload: id})
    },
    itemIncrease: (id) => {
      dispatch({type:'ITEM_INC', payload: id})
    },
    decrease: (id) => {
      dispatch({type:'DEC'})
    },
    increase: (id) => {
      dispatch({type:'INC'})
    },
    priceChange: (e) => {
      dispatch({type: 'PRICE', payload: e.target.value})
    },
    nameChange: (e) => {
      dispatch({type: 'NAME', payload: e.target.value})
    },
    linkState: () => {
      dispatch({type: 'LINK_STATE'})
    },
    opState: () => {
      dispatch({type: 'OPEN_STATE'})
    },
    onChangeSum: () => {
      dispatch({type: 'SUM'})
    },
	})
)(Creator);
