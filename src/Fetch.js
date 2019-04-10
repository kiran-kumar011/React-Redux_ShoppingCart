import React, {Component} from 'react';
import {connect} from 'react-redux'



class Fetch extends Component {
	addToCart = (data) => {
		this.props.prop.dispatch({type: 'ADD_CART', product: {...data, quantity: 0}})
		var addedItems = this.props.prop.addCart.length? (this.props.prop.addCart.reduce((acc, val) => {
			acc = acc + val.quant
			return acc;
		}, 0)): 0
	}
	render() {
		const sortArr = [...this.props.array];
		return (
			<div className='imagesWapper'>
				{
					sortArr.sort((a,b) => {
						if(this.props.sort ==='Select') {
							return;
						} else if (this.props.sort === 'Lowest to Highest') {
							return a.price - b.price;
						} else {
							return b.price - a.price;
						}
					}).map(product => {
						let link = `https://raw.githubusercontent.com/jeffersonRibeiro/react-shopping-cart/master/src/static/products/${product.sku}_1.jpg`
						return (
							<div onClick={() => this.addToCart(product)} key={product.sku}  className='productDescription'>
								<span className='freeShip'>{product.isFreeShipping ? 'Free shipping': ''}</span>
								<img src={link} alt='T-shirts'/>
								<h1>{product.title}</h1>
								<div className='border'></div>
								<h3>${product.price}</h3>
								<h4>or {`${product.installments} x $${(product.price / product.installments).toFixed(2)}`}</h4>
								<button className='addToCart'>Add to cart</button>
							</div>
						);
					})
				}
			</div>
		);
	}
}

export default connect()(Fetch);
