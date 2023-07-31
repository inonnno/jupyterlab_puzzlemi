import { Dispatch } from 'redux';
//import { IProblem, IProblemType } from '../reducers/problems';
import { Problem } from '../model';
//import uuid from '../utils/uuid';

export interface IAddTextResponseProblem {
  type: 'AddTextResponseProblem';
}

export function addTextResponseProblem() {
  return async (dispatch: Dispatch, getState) => {
    const { shareJSONDocs } = getState();
    const PuzzleDoc = shareJSONDocs.PuzzleDoc;

    const newProblem: Problem = {
      id: 3,
      question: '',
      solution: '',
      answer: ''
    };

    await PuzzleDoc.submitObjectInsertOp(newProblem);
  };
}
