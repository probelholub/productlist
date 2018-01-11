import React, { Component } from 'react';
import { v4 } from 'uuid';
import PropTypes from 'prop-types';
import './Creator.css';
import ProductItem from './ProductItem';
import LinkItem from './LinkItem';

export default class ProductList extends Component {
  static propTypes = {
    isLinkOpened: PropTypes.bool.isRequired,
    resultList: PropTypes.array.isRequired,
    linkedItem: PropTypes.array.isRequired,
    sum: PropTypes.number.isRequired,
    onItemDecrease: PropTypes.func.isRequired,
    onItemIncrease: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
    onBack: PropTypes.func,
    onLinkProduct: PropTypes.func,
    changeSum: PropTypes.func,
    data: PropTypes.object,
  }
  constructor(props) {
    super(props)
    this.onItemDecrease = this.onItemDecrease.bind(this)
    this.onItemIncrease = this.onItemIncrease.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.onLinkProduct = this.onLinkProduct.bind(this)
    this.onBack = this.onBack.bind(this)
    this.changeSum = this.changeSum.bind(this)
  }

  componentWillReceiveProps(){
    this.changeSum()
  }
  changeSum(){
    const { changeSum } = this.props
    changeSum()
  }
  /*This ID beginning from ProductItem and LinkItem, not props!!its just some bridge*/
  onItemDecrease(id) {
    const { onItemDecrease } = this.props
    onItemDecrease(id)
  }
  onItemIncrease(id) {
    const { onItemIncrease } = this.props
    onItemIncrease(id)
  }
  onDelete(id) {
    const { onDelete } = this.props
    onDelete(id)
  }
  onLinkProduct(id) {
    const { onLinkProduct } = this.props
    onLinkProduct(id)
  }
  onBack(id) {
    const { onBack } = this.props
    onBack(id)
  }
  render() {
    const { isLinkOpened, resultList, linkedItem, sum} = this.props
    const { onItemDecrease, onItemIncrease, onDelete, onLinkProduct, onBack } = this
    var items, lItem, sumView
    if(sum !== 0){
      sumView = <li className="ProductItemLI">Total: {sum} $</li>
    }
    if(!isLinkOpened){
      items = resultList.map((item) => {
        return (
          <ProductItem
            key={v4()}
            id={item.id}
            count={item.count}
            onIncrease={onItemIncrease}
            onDecrease={onItemDecrease}
            onDelete={onDelete}
            onLinkProduct={onLinkProduct}
            data={item.data}
          />
        )
      })
    }else {
      lItem = linkedItem.map((item) => {
        return (
          <LinkItem
            key={v4()}
            id={item.id}
            count={item.count}
            onBack={onBack}
            data={item.data}
          />
        )
      })
    }

    return (
      <div className="columnMenu">
        <h2>Product list</h2>
        <ul>
          {items}
          {lItem}
          {sumView}
        </ul>
      </div>
    )
  }
}
