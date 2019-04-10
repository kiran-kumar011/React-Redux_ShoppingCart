import React, {Component} from 'react';
import Fetch from './Fetch';
import Loading from	'./Loading';
import {connect} from 'react-redux';
import Cart from './Cart'


class Display extends Component {
	constructor() {
		super();
		this.state = {
			loading: false,
			sort: '',
			cart: false,
			items: 0,
		}
	}
	
	handleClick = (size) => {
		this.props.dispatch({type: 'TOGGLE_SIZE', currentSize: size.size})
	}
	componentDidMount() {
		this.setState({loading: true})
		fetch(`https://react-shopping-cart-67954.firebaseio.com/products.json`).then(res => res.json()).then(data => {
			let sizes = data.products.reduce((acc, val)=> {
				return [...acc, ...val.availableSizes]
			}, []);
			
			this.props.dispatch({type:'ADD_PRODUCT', products: data.products})
			this.props.dispatch({type:'ADD_SIZE', sizes: [...new Set(sizes)].map(v => ({size: v, isClicked: false}))})
		this.setState({loading: false})

		})
	}
	handleChange = (e) => {
		this.setState({sort: e.target.value})
		this.props.dispatch({type: 'SORT', sort: e.target.value})
	}
	showCart = (e) => {
		this.setState(state => ({ cart: !this.state.cart }))
	}
	render() {	
			const filterdSize = this.props.sizes.filter((si,i) => si.isClicked === true).map(val => val.size)
			const renderArr = this.props.products.filter((product, id) => product.availableSizes.some(size => filterdSize.length ? (filterdSize.includes(size)): size))

			// calculating the quantity of t shirts
			const count = this.props.addCart.reduce((acc,val) => {
				acc = acc + val.quant;
				return acc;
			},0)
		return (
			<main>
				<div className='header'>
					{
						this.state.cart ? <Cart added={this.props} updateCount={this.selectedItemsLength} count={this.props.addCart.length? count : 0} method={this.showCart}/> : 
						(
							<div onClick={this.showCart} className='cartMain'>
								<i className="fab fa-opencart"/>
								<button>{this.props.addCart.length? count : 0}</button>
							</div>
						)
					}	
				</div>
				<div className='mainWrapper'>
					<div className='sizesWrapper'>
						<h4>Sizes:</h4>
						<div className='sizeList'>
							<ul>
							{
								this.props.sizes? (this.props.sizes.map((s,i) => {
								return (	
									<li key={s.size}><button className={s.isClicked ? 'active': 'sizes'} onClick={() => this.handleClick(s)}>{s.size}</button></li>	
								)
								})) : ''
							}
							</ul>
						</div >
					</div>
					<div className='imageWrapper'>
						{
							this.props.products ? (
							<div>
								<div className='imageSort'>
									<p className='lengthCount'>{renderArr.length} Product(s) found.</p>
									<div>
										<label>Order by:</label>
										<div className='dropDown'>
											<select onChange={this.handleChange} id="pet-select">
											    <option value="Select">Select</option>
											    <option value="Lowest to Highest">Lowest to Highest</option>
											    <option value="Highest to Lowest">Highest to Lowest</option>
											</select>
										</div >
									</div>
								</div>
								<Fetch array={renderArr}fil={this.filteredArray} count={this.selectedItemsLength} products={this.state} prop={this.props} sort={this.state.sort? this.state.sort: 'Select'}/>
							</div>
							): ''
						}
						{
							this.state.loading? <Loading />: ''
						}
					</div>
				</div>
			</main>
		)
	}
}

function mapStateToProps(state) {
	return	{
		products: state.products,
		sizes: state.sizes,
		addCart: state.addCart,
	}
}


export default connect(mapStateToProps)(Display);
