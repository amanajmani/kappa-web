import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Box from '@kappa/components/src/atoms/box';
import Checkbox from '../../atoms/checkbox';
import useStyles from './editAddressModal.styles';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction='up' ref={ref} {...props} />
));

const EditAddressModal = ({
  handleClose,
  open,
  dialogTitle,
  cancelTitle,
  handleSubmitAddress,
  data,
  handleUpdateAddress,
  deleteAddress,
  type,
}) => {
  const [address, setAddress] = useState({
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    default: false,
  });

  useEffect(() => {
    console.log(data, 'data in edit mode');
    if (data) {
      setAddress(data);
    }
  }, [data]);

  const classes = useStyles();

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    setAddress((prevState) => ({
      ...prevState,
      [name]: name === 'default' ? checked : value,
    }));
  };

  const submitAddress = (address) => {
    if (cancelTitle === 'Cancel') {
      handleSubmitAddress(address);
      setAddress({
        address: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
        default: false,
      });
    } else {
      handleUpdateAddress(address);
      setAddress({
        address: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
        default: false,
      });
    }
  };

  const closeButton = (addressId) => {
    if (cancelTitle === 'Delete') {
      deleteAddress(addressId);
    } else {
      handleClose();
      setAddress({
        address: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
        default: false,
      });
    }
  };

  if (address) console.log(typeof address.default, 'address.default');

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle id='alert-dialog-slide-title'>{dialogTitle}</DialogTitle>
        <DialogContent>
          <form noValidate autoComplete='off' className={classes.root}>
            <Box width='100%'>
              <TextField
                id='standard-basic'
                fullWidth
                className={classes.verticalSpacing}
                value={address.address}
                onChange={handleChange}
                name='address'
              />
              <Box
                width='100%'
                className={`${classes.flex} ${classes.verticalSpacing}`}
              >
                <TextField
                  id='standard-basic'
                  value={address.city}
                  onChange={handleChange}
                  name='city'
                />
                <TextField
                  id='standard-basic'
                  value={address.state}
                  onChange={handleChange}
                  name='state'
                />
              </Box>
              <Box
                width='100%'
                className={`${classes.flex} ${classes.verticalSpacing}`}
              >
                <TextField
                  id='standard-basic'
                  value={address.country}
                  onChange={handleChange}
                  name='country'
                />
                <TextField
                  id='standard-basic'
                  value={address.postalCode}
                  onChange={handleChange}
                  name='postalCode'
                />
              </Box>
              <Box className={classes.verticalSpacing}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name='default'
                      checked={!!address.default}
                      onChange={handleChange}
                    />
                  }
                  label='Make this my default address'
                />
                {/* onChange=
                {(e) => {
                  console.log(e.target.checked, 'clicked');
                  setIsTrue({ isTrue: !isTrue });
                }} */}
              </Box>
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closeButton(address._id)} color='primary'>
            {cancelTitle}
          </Button>
          {}
          <Button onClick={() => submitAddress(address)} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default EditAddressModal;
