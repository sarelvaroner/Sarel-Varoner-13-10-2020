import { combineReducers } from 'redux';
import emails from './emails';
import ui from './ui';
import user from './user';


const rootReducer = combineReducers({
  user,
  emails,
  ui
});

export default rootReducer;