import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import history from 'utils/history';
import { clickCard, generateNewCards, saveScore } from 'store/actions/game';
import Card from 'components/Card';
import FinishModal from 'components/FinishModal';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    background: theme.palette.background.paper,
  },
  content: {
    width: 695,
    minHeight: 'calc(100vh - 60px)',
    margin: 'auto',
    padding: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    boxSizing: 'border-box',

    '@media (min-width: 0px) and (orientation: landscape)': {
      minHeight: 'calc(100vh - 52px)',
      padding: theme.spacing(1),
    },

    '@media (min-width: 600px)': {
      minHeight: 'calc(100vh - 68px)',
      padding: theme.spacing(3),
    },
  },
  cardWrapper: {
    marginBottom: '1rem',
    flex: '1 1 25%',
  },
}));

function GameBoard() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    cardList, removed, selected, isStart, clickCount,
  } = useSelector((state) => state.game);

  useEffect(() => {
    if (!cardList.length) {
      dispatch(generateNewCards());
    }
  }, []);

  useEffect(() => {
    if (cardList.length && cardList.length === removed.length) {
      dispatch(saveScore());
    }
  }, [cardList, removed]);

  const handleClick = (id) => {
    dispatch(clickCard(id));
  };

  const handleFinish = () => {
    history.push('/score-board');
  };

  return (
    <>
      <Box className={classes.container}>
        <Box className={classes.content}>
          {cardList.map((item, index) => (
            <Box key={index} className={classes.cardWrapper}>
              <Card
                value={item}
                isRemoved={removed.includes(index)}
                isSelected={selected.includes(index)}
                isStart={isStart}
                isFinished={cardList.length && cardList.length === removed.length}
                handleClick={() => handleClick(index)}
              />
            </Box>
          ))}
        </Box>
      </Box>
      <FinishModal
        isOpen={cardList.length && cardList.length === removed.length}
        handleClose={handleFinish}
        score={100 - 1.5 * clickCount}
      />
    </>
  );
}

export default GameBoard;
