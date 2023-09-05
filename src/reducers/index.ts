import { combineReducers } from 'redux';
import { users, IUsers } from './users';
import { IJSONDocsState, shareJSONDocs } from './sharedJSON';
import reduceReducers from 'reduce-reducers';
import { ProblemAdded } from './ProblemAdded';
import { RESTORE_STATE } from './restore_state';

export interface IPMState {
  users: IUsers;
  shareJSONDocs: IJSONDocsState;
}

const combinedReducers = combineReducers({
  shareJSONDocs,
  users,
  ProblemAdded
  //RESTORE_STATE
});

export const rootReducer = reduceReducers(combinedReducers) as any;
