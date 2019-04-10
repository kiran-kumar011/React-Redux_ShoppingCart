import {createStore, combineReducers} from 'redux';
import { products, sizes, addCart } from './../reducers';

const rootReducer = combineReducers({
	products,
	sizes,
	addCart,
})

export const store = createStore(rootReducer);