import { combineReducers } from 'redux';

import productContainerReducer from '../pages/productsContainer/productsContainer.reducers';
import categoriesReducer from './categories.reducers';
import productReducer from '../pages/product/product.reducers';
import cartReducer from './cart.reducers';
import authReducer from './auth.reducers';
import addressReducer from './address.reducers';
import orderReducer from './order.reducers';

export default combineReducers({
  productsInfo: productContainerReducer,
  product: productReducer,
  categories: categoriesReducer,
  cart: cartReducer,
  auth: authReducer,
  address: addressReducer,
  order: orderReducer,
});
