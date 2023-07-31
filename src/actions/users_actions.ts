export interface ISetIsAdminAction {
  type: 'SET_IS_ADMIN';
  Admin: boolean;
}

export const setIsAdmin = (isAdmin: boolean): ISetIsAdminAction => ({
  Admin: isAdmin,
  type: 'SET_IS_ADMIN'
});
