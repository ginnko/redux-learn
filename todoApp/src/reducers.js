/**
 * Reducers specify how the application's state changes in response to 
 * actions sent to the store. Remember that actions only describe the 
 * fact that something happened, but don't describe how the application's 
 * state changes.
 */



import { combineReducers } from 'redux';
import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  VisibilityFilters
} from './actions';

const { SHOW_ALL } = VisibilityFilters;

