import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Creator.css';

export default class LinkItem extends Component {
	static propTypes = {
    id: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    onBack: PropTypes.func,
    data: PropTypes.object,
  }
  constructor(props) {
    super(props)
    this.onBack = this.onBack.bind(this)
  }

  onBack() {
    const { onBack, id } = this.props
    onBack(id)
  }
  render() {
    const { count, data } = this.props
    const { onBack } = this
    return (
      <div className="ProductItemLI">
      	<h2>{data.productName}</h2>
        <div>
          <img src={data.image} alt='' />
        </div>
        <p>Price:{data.productPrice} $</p>
        <p>Count:{count} </p>
        <button className="button" onClick={onBack}>Back</button>
      </div>
    )
  }
}