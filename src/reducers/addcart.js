const newArr = [...state, action.product];
			newArr.filter((prod, i) => {
				if(action.product.id === prod.id) {
					return {...prod, quantity: ++prod.quantity}
				}
			})


		if(state.length === 0) {
				return [...state, action.product]
			} else if(state.length !== 0) {
				const temp = []
				const check = [...state].map(val => {
					if(val.id === action.product.id) {
						console.log('if equal')
						return [...state , {...val, quantity: ++val.quantity}]
					} else if(val.id !== action.product.id){
						console.log('else if not equal to', val)
					  return [...state, {...val, quantity: 1}]
					}
 				})
				console.log(check, 'reducer')
				return	check;