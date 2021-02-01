import { combineReducers } from 'redux';

import game from './game';
import theme from './theme';

export default combineReducers({
  game,
  theme,
});
