import PuzzleDocModelInstance from '../createdoc';
import PuzzleDocInstance from '../createdoc';
import { ExampleDoc, Problem, PuzzleDocModel } from '../model';
import { ExampleDocModelFactory } from '../factory';
import { DocumentRegistry } from '@jupyterlab/docregistry';

export interface IJSONDocsState {
  PuzzleDoc: ExampleDoc;
  problems: Problem[];
}
const initialState: IJSONDocsState = {
  PuzzleDoc: PuzzleDocInstance,
  problems: PuzzleDocInstance.get('problems')
};

export const shareJSONDocs = (state: IJSONDocsState = initialState, action) => {
  switch (action.type) {
    case 'AddTextResponseProblem':
      return { ...state, problems: state.PuzzleDoc.get('problems') };
    case 'UpdateProblemDescription':
      return {
        ...state,
        problems: state.PuzzleDoc.updateProblemDescription(
          action.description,
          action.index
        )
      };
    default:
      return state;
  }
};
