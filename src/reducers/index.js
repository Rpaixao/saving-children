import { combineReducers } from 'redux';
import problemsReducer from './reducer_problems'
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  problems: problemsReducer,
  form: formReducer
});

export default rootReducer;
