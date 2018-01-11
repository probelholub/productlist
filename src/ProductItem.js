import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Creator.css';

export default class ProductItem extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    onDecrease: PropTypes.func.isRequired,
    onIncrease: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
    onLinkProduct: PropTypes.func,
    data: PropTypes.object,
  }
  constructor(props) {
    super(props)
    this.onDecrease = this.onDecrease.bind(this)
    this.onIncrease = this.onIncrease.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.onLinkProduct = this.onLinkProduct.bind(this)
  }
  onDecrease() {
    const { onDecrease, id } = this.props
    onDecrease(id)
  }
  onIncrease() {
    const { onIncrease, id } = this.props
    onIncrease(id)
  }
  onDelete() {
    const { onDelete, id } = this.props
    onDelete(id)
  }
  onLinkProduct() {
    const { onLinkProduct, id } = this.props
    onLinkProduct(id)
  }
  render() {
    const { count, data } = this.props
    const { onDecrease, onIncrease, onDelete, onLinkProduct } = this
    return (
      <li className="ProductItemLI">
        <div className="resultListTable">
            <div className="resultListLI">
              <img src={data.image} alt="" />
            </div>
            <div className="resultListLI">
              <p>{data.productName}</p>
              <p>Price:{data.productPrice} $</p>
              <button className="button" onClick={onDecrease}>-</button>
              <label> {count} </label>
              <button className="button" onClick={onIncrease}>+</button>
            </div>
            <div className="resultListLI">
              <button className="button" onClick={onDelete}>Delete</button>
              <button className="button" onClick={onLinkProduct}>Link</button>
            </div>
        </div>
      </li>
    )
  }
}
