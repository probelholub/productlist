import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Creator.css';

function getKey(str){
  let key = 0;
  for (let i = 0; i < str.length; i++) {
    key += str.charCodeAt(i);
  }
  return key.toString();
}

export default class listImg extends Component {
	static propTypes = {
		idImg: PropTypes.number.isRequired,
    item: PropTypes.string.isRequired,
    chooseItem: PropTypes.func,
  }
  constructor(props) {
    super(props)
    this.chooseItem = this.chooseItem.bind(this)
  }

  chooseItem(){
  	const { chooseItem, idImg } = this.props
    chooseItem(idImg)
  }

  render() {
		const key = getKey(item);
		return (
			<li key={key} className="standartList">
	      <button onClick=''>
	        <img src={item} width="64px" heigth="64px" />
	      </button>
	    </li>
	  );
	}
}