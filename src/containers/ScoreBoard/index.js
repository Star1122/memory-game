import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';

import history from 'utils/history';
import { getScore } from 'store/actions/game';
import MaterialTable from 'components/MaterialTable';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    background: theme.palette.background.paper,
  },
  content: {
    minHeight: 'calc(100vh - 60px)',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',

    '& > button': {
      width: 'fit-content',
      margin: '0 0 1rem auto',
    },

    '@media (min-width: 0px) and (orientation: landscape)': {
      minHeight: 'calc(100vh - 52px)',
      padding: theme.spacing(1),
    },

    '@media (min-width: 600px)': {
      minHeight: 'calc(100vh - 68px)',
      padding: theme.spacing(3),
    },
  },
}));

function ScoreBoard() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { isLoading, scores } = useSelector((state) => state.game);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(getScore())
      .catch(() => {
        enqueueSnackbar('Failed to fetch score history.', {
          preventDuplicate: true,
          variant: 'error',
        });
      });
  }, [dispatch, enqueueSnackbar]);

  return (
    <Box className={classes.container}>
      {isLoading && <LinearProgress />}

      <Box className={classes.content}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AutorenewIcon />}
          onClick={() => history.push('/')}
        >
          Go back to Home
        </Button>
        <MaterialTable
          columns={['ranking', 'userName', 'score', 'date']}
          rows={scores}
        />
      </Box>
    </Box>
  );
}

export default ScoreBoard;
