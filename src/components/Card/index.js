import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';

import AppCardImages from 'utils/images';

const useStyles = makeStyles((theme) => ({
  flipBox: {
    width: 150,
    height: 150,
    backgroundColor: 'transparent',
    perspective: 1000,

    '&.selected-card > div': {
      transform: 'rotateY(180deg)',
    },

    '&.removed-card > div': {
      transform: 'rotateY(180deg) scale(0, 0)',
    },
  },
  flipBoxInner: {
    position: 'relative',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    transition: 'transform 0.5s',
    transformStyle: 'preserve-3d',
  },
  flipBoxCard: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 15,
    backfaceVisibility: 'hidden',
    overflow: 'hidden',
  },
  flipBoxBack: {
    background: '#89f',
    boxShadow: `2px 2px 5px 1px ${theme.palette.action.active}`,
    color: 'black',

    '& > img': {
      width: '100%',
      height: '100%',
    },
  },
  flipBoxFront: {
    backgroundColor: '#555',
    boxShadow: `2px 2px 5px 1px ${theme.palette.action.active}`,
    color: 'white',
    transform: 'rotateY(180deg)',

    '& > img': {
      width: '100%',
      height: '100%',
    },
  },
}));

function Card(props) {
  const classes = useStyles();

  const {
    isFinished,
    isRemoved,
    isSelected,
    isStart,
    value,
    handleClick,
  } = props;

  const additionalCls = `${isRemoved || isSelected || !isStart ? 'selected-card' : ''} ${isRemoved && !isFinished ? 'removed-card' : ''}`;

  return (
    <Box
      className={`${classes.flipBox} ${additionalCls}`}
      onClick={handleClick}
    >
      <Box className={classes.flipBoxInner}>
        <Box className={`${classes.flipBoxBack} ${classes.flipBoxCard}`}>
          <img src={AppCardImages.back} alt="cardBack" />
        </Box>
        <Box className={`${classes.flipBoxFront} ${classes.flipBoxCard}`}>
          <img src={AppCardImages.front[value - 1]} alt="cardBack" />
        </Box>
      </Box>
    </Box>
  );
}

Card.propTypes = {
  isRemoved: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isStart: PropTypes.bool.isRequired,
  isFinished: PropTypes.bool,
  value: PropTypes.number.isRequired,
  handleClick: PropTypes.func,
};

Card.defaultProps = {
  handleClick: () => {},
  isFinished: false,
};

export default Card;
