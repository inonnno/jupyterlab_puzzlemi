import { ExampleDoc, Problem, PuzzleDocModel } from '../model';

export interface IJSONDocsState {
  PuzzleDoc: ExampleDoc | null;
  problems: Problem[] | null;
}
const initialState: IJSONDocsState = {
  PuzzleDoc: PuzzleDocModel.getdocs(),
  problems: null
};

export const shareJSONDocs = (state: IJSONDocsState = initialState, action) => {
  switch (action.type) {
    case 'AddTextResponseProblem':
      return { ...state, problems: state.problems };
    default:
      return state;
  }
};
