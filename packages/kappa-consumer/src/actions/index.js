import * as ProductsListActions from '../pages/productsList/productsList.actions';
import * as ProductActions from '../pages/product/product.actions';
import * as CategoriesActions from './categories.actions';
import * as CartActions from './cart.actions';
import * as authActions from './auth.actions';

const ActionCreators = {
  ...ProductsListActions,
  ...ProductActions,
  ...CategoriesActions,
  ...CartActions,
  ...authActions,
};

export default ActionCreators;
