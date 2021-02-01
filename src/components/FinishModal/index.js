import React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(2, 4, 3),
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: 10,
    boxShadow: theme.shadows[5],

    '& h2': {
      marginBottom: 0,
    },

    '& button': {
      width: 'fit-content',
      margin: '0 0 0 auto',
    },

    '&:focus': {
      outline: 'none',
    },
  },
}));

function FinishModal(props) {
  const classes = useStyles();

  const { isOpen, handleClose, score } = props;

  return (
    <Modal
      className={classes.modal}
      open={isOpen}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <div className={classes.paper}>
          <h2>Well Done !</h2>

          <p>{`Your Score is ${score}.`}</p>

          <Button
            variant="outlined"
            color="primary"
            startIcon={<ArrowForwardIcon />}
            onClick={handleClose}
          >
            Continue
          </Button>
        </div>
      </Fade>
    </Modal>
  );
}

FinishModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  score: PropTypes.number,
  handleClose: PropTypes.func,
};

FinishModal.defaultProps = {
  score: 0,
  handleClose: () => {},
};

export default FinishModal;
