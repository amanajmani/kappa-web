import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

/* COMPONENTS */
import Button from '@kappa/components/src/atoms/button';
import Typography from '@kappa/components/src/atoms/typography';
import AddressCard from '../../../../../components/organisms/addressCard';
import EditAddressModal from '../../../../../components/organisms/editAddressModal';

// atoms

/* STYLES */
import useStyles from './address.styles';

/* SERVICES */
import ActionCreators from '../../../../../actions';

const Address = ({
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  address,
  message,
}) => {
  const classes = useStyles();
  const URL = 'http://localhost:5000';

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
    console.log(message, 'message');
  };

  const handleUpdateAddress = (address) => {
    updateAddress(address, address._id);
    setOpen(false);
  };

  const handleDeleteAddress = (id) => {
    deleteAddress(id);
    setOpen(false);
  };

  return (
    <>
      <div className={classes.root}>
        <Typography variant='body2' color='error'>
          {message}
        </Typography>
        <div className={classes.root}>
          <Typography
            className={classes.title}
            color='textPrimary'
            variant='h6'
          >
            Address Information
          </Typography>
          <Button
            label='Add Address'
            variant='contained'
            color='dark'
            className={classes.addAddressBtn}
            onClick={handleClickOpen}
          />
        </div>

        <EditAddressModal
          handleClose={handleClose}
          handleSubmitAddress={(address) => handleSubmitAddress(address)}
          open={open}
          dialogTitle='Add New Address'
          cancelTitle='Cancel'
        />
      </div>
      {address && address.length ? null : (
        <Typography variant='h6' color='error'>
          No Address found
        </Typography>
      )}

      <AddressCard
        handleSubmitAddress={handleSubmitAddress}
        handleUpdateAddress={(updatedAddress) =>
          handleUpdateAddress(updatedAddress)
        }
        data={address}
        deleteAddress={handleDeleteAddress}
      />
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
