import { ISetIsAdminAction } from '../actions/users_actions';

export interface IUsers {
  isAdmin: boolean;
}
const initialState: IUsers = {
  isAdmin: true
};
export const users = (
  state: IUsers = initialState,
  action: ISetIsAdminAction
) => {
  switch (action.type) {
    case 'SET_IS_ADMIN':
      return { isAdmin: action.Admin };
    default:
      return state;
  }
};
