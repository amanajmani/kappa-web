import React, { useState } from 'react';
import { autoPlay } from 'react-swipeable-views-utils';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SwipeableViews from 'react-swipeable-views';

// Styles
import useStyles from './carousel.styles';

const AutoPlayView = autoPlay(SwipeableViews);

function Carousel(props) {
  const { data } = props;

  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      <AutoPlayView
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        interval={3800}
        sty
      >
        {data.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img className={classes.img} src={step.image} alt={step.label} />
            ) : null}
          </div>
        ))}
      </AutoPlayView>

      <div className={classes.content}>
        <div className={classes.contentHeader}>
          <div>
            <Typography
              className={classes.header}
            >
              {data[activeStep].header}
            </Typography>
            <Typography
              className={classes.subHeader}
            >
              {data[activeStep].subHeader}
            </Typography>
          </div>
          <Button
            className={classes.button}
            elevation={0}
            variant="contained"
            component={Link}
            to="60cf3d9747c214054126257c/page/1"
            // component=""
          >
            {data[activeStep].buttonLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
