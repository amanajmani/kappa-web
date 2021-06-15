import React, { useEffect, useState } from 'react';
import axios from 'axios';

/* COMPONENTS */
import AddressCard from '../../../../../components/organisms/addressCard';
import EditAddressModal from '../../../../../components/organisms/editAddressModal';

// atoms

import Button from '@kappa/components/src/atoms/button';
import Typography from '@kappa/components/src/atoms/typography';

/* STYLES */

import useStyles from './address.styles';

const Address = () => {
  const classes = useStyles();
  let URL = 'http://localhost:5000';

  const [open, setOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log('handleClose kiya gya hai');
    setOpen(false);
  };

  const handleSubmitAddress = (address) => {
    // console.log(address, 'address in address page baps a gyae hai ');
    axios.post(`${URL}/api/v1/address`, address).then((res) => {
      setAddresses(res.data.shippingAddress);
    });
    console.log('closing 1');
    setOpen(false);
    console.log('closing 2');
  };

  useEffect(() => {
    axios.get(`${URL}/api/v1/address`).then((res) => {
      setAddresses(res.data.shippingAddress);
    });
  }, [open]);

  const handleUpdateAddress = (address) => {
    address = { ...address, default: true };
    axios.put(`${URL}/api/v1/address/${address._id}`, address).then((res) => {
      setAddresses(res.data.shippingAddress);
    });
    console.log('closing 1');
    setOpen(false);
    console.log('closing 2');
  };

  const deleteAddress = (addressId) => {
    axios.delete(`${URL}/api/v1/address/${addressId}`).then((res) => {
      setAddresses(res.data.shippingAddress);
    });
    console.log('closing 1');
    setOpen(false);
    console.log('closing 2');
  };

  return (
    <>
      <div className={classes.root}>
        <Typography className={classes.title} color='textPrimary' variant='h6'>
          Address Information
        </Typography>
        <Button
          label={'Add Address'}
          variant='contained'
          color='dark'
          className={classes.addAddressBtn}
          onClick={handleClickOpen}
        />
        <EditAddressModal
          handleClose={handleClose}
          handleSubmitAddress={(address) => handleSubmitAddress(address)}
          open={open}
          dialogTitle={'Add New Address'}
          cancelTitle={'Cancel'}
        />
      </div>

      <AddressCard
        handleSubmitAddress={handleSubmitAddress}
        handleUpdateAddress={(address) => handleUpdateAddress(address)}
        data={addresses}
        deleteAddress={deleteAddress}
      />
    </>
  );
};

export default Address;
