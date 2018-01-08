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
  render() {
    const { image, count, onLinkProduct, data } = this.props
    const { onDecrease, onIncrease, onDelete } = this
    console.log(data);
    return (
      <li className="ProductItemLI">
        <div>
          <ul className="ProductItemUL">
            <li className="resultListLI">
              <img src={data.image} />
            </li>
            <li className="resultListLI">
              <p>{data.productName}</p>
              <p>Цена:{data.productPrice}</p>
              <button onClick={onDecrease}>-</button>
              <label>{count}</label>
              <button onClick={onIncrease}>+</button>
            </li>
            <li className="resultListLI">
              <button onClick={onDelete}>Delete</button>
              <button onClick={onLinkProduct}>Link</button>
            </li>
          </ul>
        </div>
      </li>
    )
  }
}
