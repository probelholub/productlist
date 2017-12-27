import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProductItem extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    onDecrease: PropTypes.func.isRequired,
    onIncrease: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
    onLinkProduct: PropTypes.func,
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
    const { image, count, onLinkProduct } = this.props
    const { onDecrease, onIncrease, onDelete } = this

    return (
      <li className="resultListLI">
        <div>
          <img src={image} />
          <button onClick={onDelete}>Delete</button>
          <button onClick={onLinkProduct}>Link</button>
          <button onClick={onDecrease}>-</button>
          <label>{count}</label>
          <button onClick={onIncrease}>+</button>
        </div>
      </li>
    )
  }
}
