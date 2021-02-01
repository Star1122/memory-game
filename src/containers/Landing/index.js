import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import SaveIcon from '@material-ui/icons/Save';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { saveName } from 'store/actions/game';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    background: theme.palette.background.paper,
  },
  content: {
    minHeight: 'calc(100vh - 60px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',

    '@media (min-width: 0px) and (orientation: landscape)': {
      minHeight: 'calc(100vh - 52px)',
    },

    '@media (min-width: 600px)': {
      minHeight: 'calc(100vh - 68px)',
      padding: theme.spacing(3),
    },
  },
  inputControl: {
    minWidth: 296,
    margin: theme.spacing(1),
  },
  button: {
    width: 296,
    height: 56,
    margin: theme.spacing(1),
    fontSize: 16,
    textTransform: 'none',
  },
  title: {
    marginBottom: '2rem',
    fontSize: theme.spacing(5),
  },
}));

function Landing() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [username, setUsername] = useState('');

  const handleSaveUserName = () => {
    dispatch(saveName(username));
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.content}>
        <Typography
          className={classes.title}
          component="h1"
          color="primary"
        >
          Mini Memory Game
        </Typography>
        <Box>
          <FormControl className={classes.inputControl} variant="outlined">
            <InputLabel htmlFor="amount">Please input Your Name</InputLabel>
            <OutlinedInput
              id="amount"
              labelWidth={173}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
        </Box>

        <Box>
          <Button
            color="primary"
            size="large"
            variant="contained"
            className={classes.button}
            startIcon={<SaveIcon />}
            disabled={!username}
            onClick={handleSaveUserName}
          >
            Start Game
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Landing;
