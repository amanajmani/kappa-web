import React, { useState } from 'react';

import Typography from '@kappa/components/src/atoms/typography';
import Paper from '@kappa/components/src/atoms/paper';
import List from '@kappa/components/src/atoms/list';
import Radio from '../../atoms/radio';

/* STYLES */

import useStyles from './addressCard.styles';
import EditIcon from '../../../../src/assets/images/edit';

import EditAddressModal from '../editAddressModal';

const AddressCard = ({
  data,
  handleUpdateAddress,
  handleSubmitAddress,

  deleteAddress,
}) => {
  const [open, setOpen] = useState(false);
  const [updateAddress, setUpdateAddress] = useState({});

  const handleClickOpen = (address) => {
    setUpdateAddress(address);
    setOpen(true);
  };

  const clearAddress = () => {
    setUpdateAddress({
      address: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      default: false,
    });
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <>
      <List className={classes.scrollable} subheader={<li />}>
        {data.map((address, i) => (
          <Paper className={classes.addressPaper}>
            <Radio
              checked={address.default === true}
              onChange={() => handleUpdateAddress(address)}
              value={i}
              name='radio-button-demo'
            />
            <div>
              <Typography color='textPrimary' variant='body2'>
                Address Line : {address.address}
              </Typography>

              <div className={classes.flex}>
                <Typography color='textPrimary' variant='body2'>
                  City : {address.city}
                </Typography>
                <Typography color='textPrimary' variant='body2'>
                  State : {address.state}
                </Typography>
              </div>

              <div className={classes.flex}>
                <Typography color='textPrimary' variant='body2'>
                  Country : {address.country}
                </Typography>
                <Typography color='textPrimary' variant='body2'>
                  ZipCode : {address.postalCode}
                </Typography>
              </div>
            </div>
            <EditIcon
              className={classes.EditIcon}
              onClick={() => handleClickOpen(address)}
            />

            {/* <DeleteIcon className={classes.deleteIcon} /> */}
          </Paper>
        ))}
      </List>
      <EditAddressModal
        handleClickOpen={handleClickOpen}
        handleClose={clearAddress}
        open={open}
        dialogTitle={'Edit Address'}
        cancelTitle={'Delete'}
        data={updateAddress}
        handleSubmitAddress={(address) => {
          handleSubmitAddress(address);
          setOpen(false);
        }}
        handleUpdateAddress={(address) => {
          handleUpdateAddress(address);
          setOpen(false);
        }}
        deleteAddress={(address) => {
          deleteAddress(address);
          setOpen(false);
        }}
      />
    </>
  );
};

export default AddressCard;
