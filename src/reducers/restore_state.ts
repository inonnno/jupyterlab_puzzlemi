import { Problem } from '../model';
import PuzzleDocInstance from '../createdoc';

const initialState = {
  problems: PuzzleDocInstance.get('problems') as Problem[]
};

export const RESTORE_STATE = (state = initialState, action) => {
  console.log('RESTORE problems :', PuzzleDocInstance.get('problems'));
  switch (action.type) {
    case 'RESTORE_STATE':
      console.log('RESTORE_STATE');
      return {
        ...state,
        problems: [...state.problems]
      };
    default:
      return state;
  }
};
