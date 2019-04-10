export function products(state = [], action) {
	switch (action.type) {
		case 'ADD_PRODUCT': 
			return [...state, ...action.products]
		default: 
			return state;
	}
}

export function sizes(state = [], action) {
	switch (action.type) {
		case 'ADD_SIZE': 
			return action.sizes;
		case 'TOGGLE_SIZE': 
			return state.map((s,i) => {
				if(s.size === action.currentSize){
					return {...s, isClicked: !s.isClicked}
				}
				return s;
			})
		default: 
			return state;
	}
}

function addtocart(cart,product){
	let flag = true
	cart.forEach(obj => {
		if(obj.pro.id == product.id){
			obj.quant = obj.quant + 1;
			flag = false;
		}
	})
	if(flag){
		let obj = {
			pro: product,
			quant:1
		}
		cart.push(obj);
	}
	return [...cart]
}


export function addCart(state=[], action) {
	switch(action.type) {
		case 'ADD_CART':
			return addtocart(state, action.product);
		case 'REMOVE_ITEM': 
			return [...state].filter(product => action.index !== product.pro.id)
		default: 
			return state;
	}
}










