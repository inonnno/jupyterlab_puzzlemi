import { combineReducers } from 'redux';
import { users, IUsers } from './users';
import { IJSONDocsState, shareJSONDocs } from './sharedJSON';
import reduceReducers from 'reduce-reducers';

export interface IPMState {
  users: IUsers;
  shareJSONDocs: IJSONDocsState;
}

const combinedReducers = combineReducers({
  shareJSONDocs,
  users
});

export const rootReducer = reduceReducers(combinedReducers) as any;
