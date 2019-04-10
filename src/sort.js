.sort((a,b) => {
						if(this.props.sort === 'Select') {
							return;
						}
						else if(this.props.sort === 'Lowest to Highest') {
							return a.price - b.price;
						} else if(this.props.sort === 'Highest to Lowest') {
							return b.price - a.price;
						} 
					})