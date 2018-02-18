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
import * as actionCreators from './actionCreators';
import { bindActionCreators } from 'redux'

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
    this.disableButton = this.disableButton.bind(this);
  }
  changeSum(){
    this.props.actions.onChangeSum()
  }
  openedState(){
    this.props.actions.opState()
  }
  openedLinkState(){
    this.props.actions.linkState()
  }
  onProductNameChange(e){
    this.props.actions.nameChange(e)
  }
  onProductPriceChange(e) {
    this.props.actions.priceChange(e)
  }
  onIncrease(){
    this.props.actions.increase()
  }
  onDecrease(){
    this.props.actions.decrease()
  }
  onItemIncrease(id) {
    this.props.actions.itemIncrease(id)
  }
  onItemDecrease(id) {
    this.props.actions.itemDecrease(id)
  }
  onSubmit(){
    const { productName, productPrice, currentImage: image, productCount: count } = this.props.creatorStore
    const obj = {
      data: {
        productName,
        productPrice,
        image,
      },
      count,
      id: v4(),
    }
    this.props.actions.submit(obj)
  }
  onDelete(id) {
    this.props.actions.uninstall(id)
  }
  onLinkProduct(id){
    this.props.actions.linkProduct(id)
  }
  onBack(){
    this.props.actions.back()
  }
  chooseItem(item){
    this.props.actions.onChooseItem(item)
  }
  disableButton(){
  	if (this.props.creatorStore.productName.length > 0 && this.props.creatorStore.productPrice.length > 0) {
  		return false
  	} else{
  		return true
  	}
  }
  render() {
    const {
      isOpened,
      resultList,
      productName,
      productCount,
      productPrice,
      linkedItem,
      currentImage,
      isLinkOpened,
      sum } = this.props.creatorStore
  	var listImage
  	if(isOpened){
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
		              value={productName}
		              onChange={this.onProductNameChange}
		              placeholder='Product name...'
		            />
		          </p>
		          <p>
		            <input
		             	className="input"
		              type="number"
		              name="product_price"
		              value={productPrice}
		              onChange={this.onProductPriceChange}
		              placeholder='Product price...'
		            />
		          </p>
	          </div>
	          <p>
	            <button className="button" onClick={this.onDecrease}>-</button>
	            <label> {productCount} </label>
	            <button className="button" onClick={this.onIncrease}>+</button>
	          </p>
	          <button className="buttonMenu" onClick={this.openedState}>
	            <img src={currentImage} alt='' />
	          </button>
	          <div>
	          	<ul className="standartListUL">{listImage}</ul>
	          </div>
	          <button type="button" className="button" disabled={isDisabled} onClick={this.onSubmit}>Add to Card</button>
	        </div>
		      <ProductList
		      	isLinkOpened={isLinkOpened}
		      	resultList={resultList}
		      	linkedItem={linkedItem}
		      	sum={sum}
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
function mapStateToProps(state) {
  return { creatorStore: state }
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(Creator);
