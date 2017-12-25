import React, { Component } from 'react';
import './Creator.css';

function getKey(str){
      let key = 0;
      for (let i = 0; i < str.length; i++) {
        key += str.charCodeAt(i);
      }
      return key.toString();
    }

function ProductList(props){
    const productList = props.productList;
    const items = productList.map((item) => {
      const key = getKey(item);
      return (<li key={key} className="standartList">
      	<button onClick=''>
      		<img src={'image/' + item} width="50px" heigth="50px" />
      	</button>
      </li>);
    });
    return (<ul className="productList">{items}</ul>);
  }
/*CreateResultList(props) {
	    const items = props.resultList.map((item, index) => {
	      return (
	      	<li key={index} className="resultListLI">
	      		<div>
	      			<img src = {'image/' + item}/>
	      			<button onClick={this.onDelete}>Delete</button>
	      			<button onClick={this.onLinkProduct}>Link</button>
	    				<button onClick={this.onDecrease}>-</button>
			        <label>{this.state.productCount}</label>
			        <button onClick={this.onIncrease}>+</button>
	      		</div>
	      	</li>
	      	);
	    });
		return (<ul className="createdResultList">{items}</ul>);
	}*/
	
class Creator extends Component {
  constructor(props) {
    super(props);
    this.state = {	productName: '',
										productPrice: '',
										productCount: 1,
										resultList: [
										{productName: 'asd', productPrice: '213'}
										

										],
										isOpened: false
   	};
    
    this.onIncrease = this.onIncrease.bind(this);
    this.onDecrease = this.onDecrease.bind(this);
    this.onProductNameChange = this.onProductNameChange.bind(this);
    this.onProductPriceChange = this.onProductPriceChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.openedState = this.openedState.bind(this);
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
      productCount: prevState.productCount + 1
    }))
  }

  onDecrease(){
    this.setState(prevState => ({
      productCount: prevState.productCount - 1
    }))
  }

  onSubmit(event){
  	let obj = { 
  		productName: this.state.productName,
  		productPrice: this.state.productPrice,
			productCount: this.state.productCount,
			key: '1'
  	};
  	this.setState({resultList: this.state.resultList.push(obj)})
  }

  render() {
  	const productList = ['batteryfull.png','lens.png','paintbrush.png','polaroidcamera.png'];
  	let mass = this.state.resultList;
  	let newmass = mass.map((item) => {
				      return (
				      	<li key={2} className="resultListLI">
				      		<div>
				      			<img src = {'./image/' + item} />
				      			<button onClick={this.onDelete}>Delete</button>
				      			<button onClick={this.onLinkProduct}>Link</button>
				    				<button onClick={this.onDecrease}>-</button>
						        <label>{this.state.productCount}</label>
						        <button onClick={this.onIncrease}>+</button>
				      		</div>
				      	</li>
				      	)
				    });
  	console.log(newmass);
    return (
    	<div>
	    	<div className="columnMenu">
		      	<h2>Add product to your cart list</h2>
		        <p><input type="text" name="login" value={this.state.productName} onChange={this.onProductNameChange} placeholder='Product name...'/></p>
		        <p><input type="password" name="password" value={this.state.productPrice} onChange={this.onProductPriceChange} placeholder='Product price...'/></p>
		        <div>
			        <button onClick={this.onDecrease}>-</button>
			        <label>{this.state.productCount}</label>
			        <button onClick={this.onIncrease}>+</button>
		        </div>
		        <button onClick={this.openedState}><img src='./image/money.png'/></button>
		        <ProductList productList={productList} />
		       	<button onClick={this.onSubmit}></button>
	    	</div>
	    	<div>
	    		<h2>Product list</h2>
	    		<ul>{newmass}</ul>
	    	</div>
    	</div>);
  }
}  

export default Creator;