import { ExampleDoc, Problem, PuzzleDocModel } from '../model';

export interface IJSONDocsState {
  PuzzleDoc: ExampleDoc;
  problems: Problem[];
}

export const shareJSONDocs = (state, action) => {
  switch (action.type) {
    case 'AddTextResponseProblem':
      return { problems: state.puzzleDoc.problems };
    default:
      return state;
  }
};
