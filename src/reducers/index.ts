import { combineReducers } from 'redux';
import { users, IUsers } from './users';
//import { shareJSONDocs } from './sharedJSON';
import reduceReducers from 'reduce-reducers';

export interface IPMState {
  users: IUsers;
}

const combinedReducers = combineReducers({
  //shareJSONDocs,
  users
});

export const rootReducer = reduceReducers(combinedReducers) as any;
