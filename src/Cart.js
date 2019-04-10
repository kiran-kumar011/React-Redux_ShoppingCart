import React, {Component} from 'react'; 

export default class Cart extends Component {
	removeItem = (id) => {
		this.props.added.dispatch({type: 'REMOVE_ITEM', index: id })
	}
	message = (total) => {
		alert(`Checkout -the Subtotal: $${total}`)
	}
	totalPrice = (array) => {
		var total = array.reduce((acc, val) => {
			if(val.quant > 1) {
				acc = acc + (val.pro.price * val.quant);
			} else acc = acc + val.pro.price
			return acc;
		}, 0)
		return total.toFixed(2);
	}
	render() {
		console.log(this.props)
		let newArr = [...this.props.added.addCart]
	return (
		<div className='cart'>
			<p className='closeCart' onClick={this.props.method}>X</p>
			<div className='cartClose'>
				<div>
					<i className="fab fa-opencart"/>
					<button className='countBtn' style={{height: '30px', width:'30px', backgroundColor: '#eabf00', fontSize: '16px', borderRadius: '50%'}}>{this.props.count}</button>
				</div>
				<span>Cart</span>
			</div>
			<div className='breakLine'/>
			<div className='selectedTshirts'>
				{
					this.props.added.addCart.length ?   
					(newArr.map((pro,i) => {
						return (
							<div key={i} >
								<div className='itemsContainer'>
									<p className='removeItem' onClick={() => this.removeItem(pro.pro.id)}>x</p>
									<div key={i} className='addedItem'>
										<img alt={pro.pro.title} style={{width:'70px'}} src={`https://raw.githubusercontent.com/jeffersonRibeiro/react-shopping-cart/master/src/static/products/${pro.pro.sku}_1.jpg`}/>
										<div>
											<p style={{color:'white', fontSize: '19px', lineHeight: '20px'}}>{pro.pro.title}</p>
											<div className='sizeAndStyle' style={{display: 'grid', gridTemplateColumns: 'auto auto 1fr', gridGap: '8px', alignItems: 'center'}}>
												<span style={{color: 'rgba(255,255,255,0.4)'}}>{pro.pro.availableSizes[0]}</span>
												<div style={{display: 'inline-block', height: '12px', border: '0.8px solid rgba(255,255,255,0.3)'}}></div>
												<span style={{color:'rgba(255,255,255,0.4)', lineHeight: '20px'}}>{pro.pro.style}</span>
											</div>
											<p style={{fontSize: '18px',color:'rgba(255,255,255,0.4)', lineHeight: '20px'}}>Quantity: {pro.quant}</p>
										</div>
										<h5 style={{color: '#eabf00'}}>$ {pro.pro.price}</h5>
									</div>
									<div className='breakLine'/>
								</div>
							</div>
						)
					})) : <p className='defaultMessage'>Add some products to the cart <br/> ;)</p>
				}
			</div>
			<div className='cartTotal'>
				<div className='subtotal'>
					<h2>Subtotal</h2>
					<span style={{color:'#eabf00', fontSize: '24px'}}>${newArr.length ? this.totalPrice(newArr): '0'}</span>
				</div>
				<button onClick={() => this.message(this.totalPrice(newArr))} className='checkout'>checkout</button>
			</div>
		</div>
	)
}
}