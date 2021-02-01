import {
  CHANGE_CLICKABLE_CARD,
  CLICK_CARD,
  FETCH_SCORES_REQUEST,
  FETCH_SCORES_SUCCESS,
  FETCH_SCORES_FAILURE,
  GENERATE_NEW_CARDS,
  START_GAME,
  INPUT_USER_NAME,
  SAVE_SCORE_REQUEST,
  SAVE_SCORE_SUCCESS,
  SAVE_SCORE_FAILURE,
} from '../actionTypes';

const INITIAL_STATE = {
  isLoading: false,
  isSaving: false,
  scores: [],
  removed: [],
  selected: [],
  cardList: [],
  username: '',
  clickCount: 0,
  clickable: true,
  isStart: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_SCORES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_SCORES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        scores: action.payload.scores,
      };
    case FETCH_SCORES_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case SAVE_SCORE_REQUEST:
      return {
        ...state,
        isSaving: true,
      };
    case SAVE_SCORE_SUCCESS:
    case SAVE_SCORE_FAILURE:
      return {
        ...state,
        isSaving: false,
      };

    case INPUT_USER_NAME:
      return {
        ...state,
        username: action.payload.username,
      };

    case GENERATE_NEW_CARDS:
      return {
        ...state,
        cardList: action.payload.cardList,
        isStart: false,
        removed: [],
        selected: [],
        clickCount: 0,
        clickable: true,
      };

    case START_GAME:
      return {
        ...state,
        isStart: true,
      };

    case CLICK_CARD:
      return {
        ...state,
        selected: action.payload.selected,
        clickable: false,
        clickCount: state.clickCount + 1,
      };

    case CHANGE_CLICKABLE_CARD:
      return {
        ...state,
        selected: action.payload.selected,
        removed: action.payload.removed,
        clickable: true,
      };

    default:
      return state;
  }
};
