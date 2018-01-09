import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Creator.css';

export default class ListImg extends Component {
	static propTypes = {
    item: PropTypes.string.isRequired,
    chooseItem: PropTypes.func,
  }
  constructor(props) {
    super(props)
    this.chooseItem = this.chooseItem.bind(this)
  }

  chooseItem(){
  	const { chooseItem, item } = this.props
    chooseItem(item)
  }

  render() {
    const { item } = this.props
    const { chooseItem } = this
		return (
			<li className="standartList">
	      <button className="buttonMenu" onClick={chooseItem}>
	        <img src={item} width="64px" heigth="64px" alt='' />
	      </button>
	    </li>
	  );
	}
}