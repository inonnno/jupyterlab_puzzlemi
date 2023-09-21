import { Dispatch } from 'redux';
//import { IProblem, IProblemType } from '../reducers/problems';
import { IProblem } from '../model';
import uuid from '../utils/uuid';
import { IProblemType } from '../model';

export interface IAddTextResponseProblem {
  type: 'AddTextResponseProblem';
}

export function addTextResponseProblem() {
  return async (dispatch: Dispatch, getState) => {
    const { shareJSONDocs } = getState();
    const PuzzleDoc = shareJSONDocs.PuzzleDoc;
    const newProblem: IProblem = {
      id: uuid(),
      description: 'here is a new problem',
      problemType: IProblemType.TextResponse
    };

    PuzzleDoc.submitObjectInsertOp(newProblem);

    dispatch({
      type: 'ProblemAdded',
      problem: newProblem
    });
  };
}
export interface IUpdateProblemDescription {
  type: 'UpdateProblemDescription';
  description: string;
  index: number;
}
export const updateProblemDescription = (
  description: string,
  index: number
): IUpdateProblemDescription => ({
  index: index,
  description: description,
  type: 'UpdateProblemDescription'
});
export interface IUpdateProblems {
  type: 'UpdateProblems';
  problems: Partial<IProblem>[];
}
export const updateProblems = (
  problems: Partial<IProblem>[]
): IUpdateProblems => ({
  problems: problems,
  type: 'UpdateProblems'
});
