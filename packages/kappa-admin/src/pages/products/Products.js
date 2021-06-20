import React, { useState, useEffect } from 'react';

/* COMPONENTS */
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ProductsTable from './components/productsTable';
import ProductView from './components/productView';

/* STYLES */
import useStyles from './products.styles';

/* UTILS */
import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from '../../network/api';
import { productsTableHeader } from '../../utils/constants';

/* ICONS */

const initialProductFields = {
  category: '',
  countInStock: null,
  discount: null,
  priority: '',
  description: '',
  price: null,
  title: '',
  user: '60cf3a3ccc00f23267623951',
};

export default function Products() {
  const classes = useStyles();

  const [fetching, setFetching] = useState(true);
  const [isProductViewOpen, setIsProductViewOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [products, setProducts] = useState(null);
  const [productParams, setProductParams] = useState({
    page: 1,
    limit: 10,
  });
  const [productFields, setProductFields] = useState(initialProductFields);
  const [imageFiles, setImageFiles] = React.useState(null);

  const handleProductFields = (name) => (event) => {
    if (name === 'countInStock' || name === 'price') {
      setProductFields({
        ...productFields,
        [name]: parseInt(event.target.value, 10),
      });
    } else {
      setProductFields({ ...productFields, [name]: event.target.value });
    }
  };

  useEffect(() => {
    setFetching(true);
    setProducts(null);
    getAllProducts(productParams).then((res) => {
      setProducts(res);
      setFetching(false);
    });
  }, [productParams]);

  const openProductView = () => {
    setIsProductViewOpen(true);
  };

  const handleAddNewProduct = () => {
    setIsEditMode(false);
    setProductFields(initialProductFields);
    setImageFiles(null);
    setIsProductViewOpen(true);
  };

  const fetchAllProducts = () => {
    return getAllProducts(productParams).then((res) => {
      setProducts(res);
      setProductFields(initialProductFields);
      setImageFiles(null);
      setFetching(false);
    });
  };

  const handleSubmit = () => {
    setIsEditMode(false);
    setIsProductViewOpen(false);
    setFetching(true);
    if (productFields.hasOwnProperty('images')) {
      delete productFields.images;
      updateProduct(productFields, imageFiles).then(() => {
        fetchAllProducts();
      });
    } else {
      addProduct(productFields, imageFiles).then(() => {
        fetchAllProducts();
      });
    }
  };

  const handleDelete = (productId) => {
    deleteProduct(productId).then(() => {
      fetchAllProducts();
    });
  };

  return (
    <div className={classes.root}>
      <ProductsTable
        bodyData={products}
        headerData={productsTableHeader}
        productParams={productParams}
        setProductParams={setProductParams}
        openProductView={openProductView}
        setProductFields={setProductFields}
        fetching={fetching}
        setIsEditMode={setIsEditMode}
        handleDelete={handleDelete}
      />
      <Fab
        color='primary'
        className={classes.icon}
        onClick={handleAddNewProduct}
      >
        <AddIcon />
      </Fab>
      <ProductView
        isOpen={isProductViewOpen}
        setIsOpen={setIsProductViewOpen}
        productFields={productFields}
        handleProductFields={handleProductFields}
        handleSubmit={handleSubmit}
        setImageFiles={setImageFiles}
        fetching={fetching}
        isEditMode={isEditMode}
      />
    </div>
  );
}
