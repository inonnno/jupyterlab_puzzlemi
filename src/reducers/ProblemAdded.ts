import { IProblem } from '../model';
import PuzzleDocInstance from '../createdoc';

const initialState = {
  problems: PuzzleDocInstance.get('problems') as IProblem[]
};

export const ProblemAdded = (state = initialState, action) => {
  switch (action.type) {
    case 'ProblemAdded':
      return {
        ...state,
        problems: [...state.problems, action.problem]
      };
    default:
      return state;
  }
};
