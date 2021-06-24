import React from 'react';
import Divider from '@kappa/components/src/atoms/divider';
import Typography from '@kappa/components/src/atoms/typography';
import Link from '@kappa/components/src/atoms/link';
import List from '@kappa/components/src/atoms/list';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Popup from '../../organisms/consumerNavbar/components/popup';
import DialogTitle from '@kappa/components/src/atoms/dialogTitle';
import DialogContent from '@kappa/components/src/atoms/dialogContent';
import IconButton from '@kappa/components/src/atoms/iconButton';

// responsive
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import Close from '../../../assets/images/close';

// Styles
import useStyles from './filtersPanel.styles';

const renderList = (handleFilters, pageType) => (filter) => {
  const classes = useStyles();
  return (
    <ListItem 
      component={Link} 
      className={classes.list} 
      onClick={handleFilters(filter.type, filter.value, pageType)}
    >
      <ListItemText primary={filter.label} />
    </ListItem>
  )
}

const FiltersPanel = ({
  isFiltersPanelVisible,
  handleFilters,
  isFixed,
  toggleFiltersPanel,
  FILTER,
  pageType,
}) => {

  const classes = useStyles();

  // responsive
  const theme = useTheme();
  const isXtraSmall = useMediaQuery(theme.breakpoints.only('xs'));

  const getFiltersList = () => {
    return (
      <div>
        <List className={classes.headerTitle}>
          <Typography variant="h6" gutterBottom>
            Sort By
          </Typography>
          {FILTER.SORT.map(renderList(handleFilters, pageType))}
        </List>
        <Divider />
        <List>
          <Typography variant="h6" gutterBottom>
            Price
          </Typography>
          {FILTER.PRICE.map(renderList(handleFilters, pageType))}
        </List>
        <Divider />
        <List>
          <Typography variant="h6" gutterBottom>
            Discount
          </Typography>
          {FILTER.DISCOUNT.map(renderList(handleFilters, pageType))}
        </List>
      </div>
    )
  }

  if(isXtraSmall) {
    return (
      <Popup isOpen={isFiltersPanelVisible}>
        <IconButton className={classes.popupIcon} onClick={toggleFiltersPanel} disableRipple>
          <Close fontSize="large" />
        </IconButton>
        <DialogTitle>
          <Typography variant="h4">Filters</Typography>
        </DialogTitle>
      <DialogContent>
        {getFiltersList()}
      </DialogContent>
    </Popup>
    )
  }

  return (
    <div 
      className={classes.root}
      style={{
        top: isFixed && 52,
        paddingLeft: isFiltersPanelVisible && 48,
        marginLeft: isFiltersPanelVisible ? 0 : -200,
      }}
    >
      {getFiltersList()}
    </div>
  );
}

export default FiltersPanel;

