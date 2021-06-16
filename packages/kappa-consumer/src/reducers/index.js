import { combineReducers } from 'redux';

import productsListReducer from '../pages/productsList/productsList.reducers';
import categoriesReducer from './categories.reducers';
import productReducer from '../pages/product/product.reducers';
import cartReducer from './cart.reducers';
import authReducer from './auth.reducers';

export default combineReducers({
  productsList: productsListReducer,
  product: productReducer,
  categories: categoriesReducer,
  cart: cartReducer,
  auth: authReducer,
});
