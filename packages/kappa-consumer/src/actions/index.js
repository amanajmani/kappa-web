import * as ProductsContainerActions from '../pages/productsContainer/productsContainer.actions';
import * as ProductActions from '../pages/product/product.actions';
import * as CategoriesActions from './categories.actions';
import * as CartActions from './cart.actions';
import * as authActions from './auth.actions';
import * as addressActions from './address.actions';
import * as orderActions from './order.actions';

const ActionCreators = {
  ...ProductsContainerActions,
  ...ProductActions,
  ...CategoriesActions,
  ...CartActions,
  ...authActions,
  ...addressActions,
  ...orderActions,
};

export default ActionCreators;
