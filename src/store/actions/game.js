import { generateCards } from 'utils';
import history from 'utils/history';
import gameService from 'services/game.service';
import storage from 'services/storage.service';
import constant from 'utils/constant';
import {
  CHANGE_CLICKABLE_CARD,
  CLICK_CARD,
  FETCH_SCORES_REQUEST,
  FETCH_SCORES_SUCCESS,
  FETCH_SCORES_FAILURE,
  GENERATE_NEW_CARDS,
  INPUT_USER_NAME,
  SAVE_SCORE_REQUEST,
  SAVE_SCORE_SUCCESS,
  SAVE_SCORE_FAILURE,
  START_GAME,
} from '../actionTypes';

const changeClickableCard = () => async (dispatch, getState) => {
  const { cardList, removed, selected } = getState().game;
  let selectedCards = [...selected];
  let removedCards = [...removed];

  if (selected.length === 2) {
    if (cardList[selected[0]] === cardList[selected[1]]) {
      removedCards = [...removedCards, ...selected];
    }
    selectedCards = [];
  }

  dispatch({
    type: CHANGE_CLICKABLE_CARD,
    payload: { selected: selectedCards, removed: removedCards },
  });
};

const setStart = () => async (dispatch) => {
  dispatch({ type: START_GAME });
};

export const generateNewCards = () => async (dispatch) => {
  dispatch({
    type: GENERATE_NEW_CARDS,
    payload: { cardList: generateCards(constant.cardCount), isStart: false },
  });

  setTimeout(() => dispatch(setStart()), 2500);
};

export const saveName = (username) => async (dispatch) => {
  dispatch({
    type: INPUT_USER_NAME,
    payload: { username },
  });
  dispatch(generateNewCards());

  storage.setItem('username', username);
  history.push('/game-board');
};

export const clickCard = (cardId) => async (dispatch, getState) => {
  const { clickable, isStart, selected } = getState().game;
  let selectedCards = [...selected];

  if (!clickable || !isStart) {
    return;
  }

  if (selected.includes(cardId)) {
    selectedCards = selected.filter((card) => card !== cardId);
  } else {
    selectedCards = [...selected, cardId];
  }

  setTimeout(() => dispatch(changeClickableCard()), selectedCards.length === 2 ? 500 : 100);

  dispatch({
    type: CLICK_CARD,
    payload: { selected: selectedCards },
  });

  history.push('/game-board');
};

export const getScore = () => async (dispatch) => {
  dispatch({
    type: FETCH_SCORES_REQUEST,
  });

  try {
    const response = await gameService.getScores();

    if (response?.scoreList) {
      dispatch({
        type: FETCH_SCORES_SUCCESS,
        payload: { scores: response.scoreList },
      });
    }

    dispatch({
      type: FETCH_SCORES_FAILURE,
    });
  } catch (e) {
    dispatch({
      type: FETCH_SCORES_FAILURE,
    });

    throw e;
  }
};

export const saveScore = () => async (dispatch, getState) => {
  dispatch({
    type: SAVE_SCORE_REQUEST,
  });
  const { clickCount } = getState().game;

  try {
    const username = storage.getItem('username');
    await gameService.saveScore({
      username,
      score: clickCount,
    });

    dispatch({
      type: SAVE_SCORE_SUCCESS,
    });
  } catch (e) {
    dispatch({
      type: SAVE_SCORE_FAILURE,
    });

    throw e;
  }
};
