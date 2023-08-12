import { Problem } from '../model';

const initialState = {
  problems: [] as Problem[]
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
