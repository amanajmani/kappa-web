/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* COMPONENTS */
import Button from '@kappa/components/src/atoms/button';
import Typography from '@kappa/components/src/atoms/typography';
import Loader from '@kappa/components/src/atoms/loader';
import AddressCard from '../addressCard';
import EditAddressModal from '../editAddressModal';

/* STYLES */
import useStyles from './address.styles';

/* SERVICES */
import ActionCreators from '../../../actions';

const Address = ({
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  address,
  message,
  fetching,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getAddresses();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitAddress = (newAddress) => {
    addAddress(newAddress);
    setOpen(false);
  };

  const handleUpdateAddress = (updatedAddress) => {
    updateAddress(updatedAddress, address._id);
    setOpen(false);
  };

  const handleDeleteAddress = (id) => {
    deleteAddress(id);
    setOpen(false);
  };

  return (
    <>
      {message ? (
        <Typography variant="body2" color="error">
          {message}
        </Typography>
      ) : null}
      <div className={classes.root}>
        <div className={classes.root}>
          <Typography
            className={classes.title}
            color="textPrimary"
            variant="h6"
          >
            Address Information
          </Typography>
          <Button
            label="Add Address"
            variant="contained"
            color="primary"
            className={classes.addAddressBtn}
            onClick={handleClickOpen}
          />
        </div>

        <EditAddressModal
          handleClose={handleClose}
          handleSubmitAddress={(submitAddress) => handleSubmitAddress(submitAddress)}
          open={open}
          dialogTitle="Add New Address"
          cancelTitle="Cancel"
        />
      </div>

      {address && address.length ? (
        <AddressCard
          handleSubmitAddress={handleSubmitAddress}
          handleUpdateAddress={(updatedAddress) => handleUpdateAddress(updatedAddress)}
          data={address}
          deleteAddress={handleDeleteAddress}
        />
      ) : fetching ? (
        <Loader padding />
      ) : (
        <Typography className={classes.textCenter} variant="h6" color="error">
          No Address found
        </Typography>
      )}
    </>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    address: state.address.address,
    fetching: state.address.fetching,
    message: state.address.message,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Address);
