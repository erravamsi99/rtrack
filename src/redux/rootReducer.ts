import { combineReducers } from 'redux';
import AppReducer from "./reducers/reducers";

const rootReducer = combineReducers({
  app: AppReducer
});

export default rootReducer;
