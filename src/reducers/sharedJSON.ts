import PuzzleDocModelInstance from '../createdoc';
import PuzzleDocInstance from '../createdoc';
import { ExampleDoc, Problem, PuzzleDocModel } from '../model';
import { ExampleDocModelFactory } from '../factory';
import { DocumentRegistry } from '@jupyterlab/docregistry';

export interface IJSONDocsState {
  PuzzleDoc: ExampleDoc;
  problems: Problem[];
  description: string;
}
const initialState: IJSONDocsState = {
  PuzzleDoc: PuzzleDocInstance,
  problems: PuzzleDocInstance.get('problems'),
  description: 'description'
};

export const shareJSONDocs = (state: IJSONDocsState = initialState, action) => {
  switch (action.type) {
    case 'AddTextResponseProblem':
      return { ...state, problems: state.PuzzleDoc.get('problems') };
    case 'UpdateProblemDescription':
      console.log('UpdateProblemDescription', state.PuzzleDoc.get('problems'));
      return {
        ...state,
        problems: state.PuzzleDoc.updateProblemDescription(
          action.description,
          action.index
        ),
        description: action.description
      };
    default:
      return state;
  }
};
